// config/logger.js
const { createLogger, format, transports } = require('winston');
const path = require('path');

// Definir el formato de los logs
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

// Crear el logger
const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    // Log a la consola
    new transports.Console(),
    // Log a archivo: todos los logs
    new transports.File({ filename: path.join('logs', 'combined.log') }),
    // Log a archivo: solo errores
    new transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join('logs', 'exceptions.log') })
  ]
});

module.exports = logger;
