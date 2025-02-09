// middleware/auth.js
const logger = require('../config/logger');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    logger.warn('No se proporcionó token de autenticación.');
    return res.status(401).json({ message: 'Token de autenticación requerido.' });
  }
  
  // Para efectos de ejemplo, se asume que el token es un string que representa el rol:
  // 'client', 'admin' o 'domiciliario'
  const validTokens = ['client', 'admin', 'domiciliario'];
  if (!validTokens.includes(token)) {
    logger.warn(`Token de autenticación inválido: ${token}`);
    return res.status(403).json({ message: 'Token de autenticación inválido.' });
  }
  
  // Se asigna el rol al objeto request para su uso posterior
  req.user = { role: token };
  next();
}

module.exports = authMiddleware;
