// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./config/logger');

const sequelize = require('./db');
const candidateRoutes = require('./routes/candidateRoutes');

const app = express();

// Configuración de CORS
const allowedOrigins = process.env.ALLOW_ORIGINS.split(',').map(origin => origin.trim());

app.use(cors({
  origin: function(origin, callback){
    // Permitir solicitudes sin origen (ej. Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'El CORS policy no permite este origen.';
      logger.warn(`CORS bloqueado para origen: ${origin}`);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Middleware para parsear JSON
app.use(express.json());

// Servir la carpeta "uploads" como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de la API
app.use('/api/candidates', candidateRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'MulterError') {
    // Errores de Multer
    return res.status(400).json({ message: err.message });
  }

  if (err.message === 'El CORS policy no permite este origen.') {
    return res.status(403).json({ message: err.message });
  }

  res.status(500).json({ message: 'Error interno del servidor.' });
});

// Iniciar el servidor y conectar a la base de datos
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    logger.info('Conexión a la base de datos exitosa.');
    app.listen(PORT, () => {
      logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Error al conectar con la base de datos:', err);
  });
