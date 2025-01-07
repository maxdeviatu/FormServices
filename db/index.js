// db/index.js
const { Sequelize } = require('sequelize');
require('dotenv').config();
const logger = require('../config/logger');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nombre de la base de datos
  process.env.DB_USER,       // Usuario de la base de datos
  process.env.DB_PASSWORD,   // Contraseña del usuario
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,          // Desactivar logging SQL
  }
);

// Probar la conexión
sequelize.authenticate()
  .then(() => {
    logger.info('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    logger.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
