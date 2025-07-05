const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Permettre les requêtes depuis file:/// (utile si vous restez en local)

//  -------- Setup --------
const port = process.env.PORT || 3000;


//  -------- Middleware --------
const authMiddleware = require('./Middleware/authMiddleware.js');
const rateLimitMiddleware = require('./Middleware/rateLimitMiddleware.js');

//  -------- DB --------
const users = new Map();
const tasks = new Map();

//  -------- Routes --------
app.post('/users', rateLimitMiddleware, (req, res) => {
  const apiKey = crypto.randomBytes(16).toString('hex');
  users.set(apiKey, { createdAt: Date.now() });
  tasks.set(apiKey, []);
  res.status(201).json({ apiKey });
});

app.get('/tasks', authMiddleware, (req, res) => {
  const userTasks = tasks.get(req.userApiKey);
  res.json(userTasks);
});

app.post('/tasks', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'Le titre est obligatoire' });

  const userTasks = tasks.get(req.userApiKey);
  const newTask = {
    id: crypto.randomUUID(),
    title: title,
    content: content || '',
    done: false,
    createdAt: Date.now(),
  };
  userTasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, done, content } = req.body;
  const userTasks = tasks.get(req.userApiKey);

  const task = userTasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });

  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;
  if (content !== undefined) task.content = content;

  res.json(task);
});

app.delete('/tasks/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const userTasks = tasks.get(req.userApiKey);
  const index = userTasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Tâche non trouvée' });

  userTasks.splice(index, 1);
  res.status(204).send();
});

//  -------- Server --------
app.listen(port, () => {
  console.log('API lancée sur http://localhost:' + port);
});
