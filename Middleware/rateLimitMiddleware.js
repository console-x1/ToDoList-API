const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  // Garde que les timestamps dans la fenêtre
  const timestamps = rateLimitMap.get(ip).filter(ts => now - ts < RATE_LIMIT_WINDOW);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ error: 'Trop de requêtes, attends un peu avant de réessayer.' });
  }

  // Ajoute le timestamp courant
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  next();
}

module.exports = rateLimit;