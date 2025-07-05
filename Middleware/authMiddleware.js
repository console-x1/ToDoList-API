function authMiddleware(req, res, next) {
  const apiKey = req.header('Authorization');
  if (!apiKey || !users.has(apiKey)) {
    return res.status(401).json({ error: 'Clé API invalide ou manquante' });
  }
  req.userApiKey = apiKey;
  next();
}

module.exports = authMiddleware;