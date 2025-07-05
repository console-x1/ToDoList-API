# Mini Todo API - Backend

## Description

API REST minimaliste pour gérer des utilisateurs identifiés par une clé API et leurs tâches Todo associées.  
Conçue pour être simple à déployer, à utiliser et à étendre.

- Clé API générée automatiquement à la création d’un utilisateur (`POST /users`)  
- Gestion complète des tâches (CRUD) par utilisateur  
- Authentification via header `Authorization: <apiKey>`  
- Mini système de rate limiting sur la création d’utilisateurs  
- Stockage en mémoire (Map) — parfait pour test et dev rapide

---

## Prérequis

- Node.js >= 16.x (testé sur v22.1)  
- NPM ou Yarn  

---

## Installation

1. Clone ce dépôt :  
```bash
git clone <url_du_repo>
cd mini-todo-api
```

2. Installe les dépendances :

```bash
npm install
```

3. Lance le serveur :

```bash
node server.js
```

4. L’API écoute sur `http://localhost:3000` par défaut.

---

## Structure du projet

```
mini-todo-api/
├── server.js               # Serveur Express principal
├── Middleware/
│   ├── authMiddleware.js  # Authentification API Key
│   └── rateLimitMiddleware.js  # Limitation création user
├── package.json
└── README.md
```

---

## Utilisation

### Création d’un utilisateur (clé API)

```bash
curl -X POST http://localhost:3000/users
```

Réponse JSON :

```json
{ "apiKey": "cle_api_unique_hex" }
```

### Authentification

Toutes les autres routes exigent un header :

```
Authorization: <apiKey>
```

---

### Routes principales

| Méthode | Route       | Description                       |
| ------- | ----------- | --------------------------------- |
| POST    | /users      | Crée un utilisateur et génère clé |
| GET     | /tasks      | Liste toutes les tâches           |
| POST    | /tasks      | Ajoute une tâche                  |
| PUT     | /tasks/\:id | Modifie une tâche                 |
| DELETE  | /tasks/\:id | Supprime une tâche                |

---

## Explications techniques

* **authMiddleware.js** : extrait la clé API depuis le header `Authorization`, vérifie si valide.
* **rateLimitMiddleware.js** : limite la fréquence de création d’utilisateur pour éviter spam.
* Les données sont stockées en mémoire dans des `Map` (`users` et `tasks`). Pas de persistance.

---

## Personnalisation

* Change le port dans `server.js` si besoin.
* Ajoute une vraie base de données pour production (MongoDB, PostgreSQL, etc.).
* Améliore le rate limiting (ex : Redis, IP tracking plus avancé).
* Sécurise l’API avec HTTPS, logs, monitoring.

---

## Contribution

Les contributions sont bienvenues : pull requests, issues, idées.

---

## Licence

MIT

---

## Contact

Pour questions ou améliorations, contacte-moi sur <a href="https://discord.com/users/1066067393123733595">discord</a>.

## Mention

Merci à chatGPT pour les README.md et le fichier index.html d'exemple ! Je ne vous cache pas que ce n'es pas mon poins fort le frontend et la doc !

---

**Ne lâche rien, ce backend est solide pour commencer !**
