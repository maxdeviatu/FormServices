// controllers/candidateController.js
const Candidate = require('../models/Candidate');
const logger = require('../config/logger');

const createCandidate = async (req, res) => {
  try {
    const { fullName, phoneNumber, email } = req.body;

    // Validaciones básicas
    if (!fullName || !phoneNumber || !email) {
      logger.warn('Faltan campos requeridos.');
      return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn(`Correo electrónico no válido: ${email}`);
      return res.status(400).json({ message: 'Formato de correo electrónico no válido.' });
    }

    // Validar formato de número de teléfono (solo dígitos y longitud entre 7 y 15)
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      logger.warn(`Número de teléfono no válido: ${phoneNumber}`);
      return res.status(400).json({ message: 'Número de teléfono no válido. Debe contener entre 7 y 15 dígitos.' });
    }

    // Validar archivo
    if (!req.file) {
      logger.warn('Archivo de CV no proporcionado o tipo de archivo no permitido.');
      return res.status(400).json({ message: 'Se requiere subir un archivo de CV en formato PDF o Word.' });
    }

    // Construir la ruta del archivo para el enlace de descarga
    const cvFilePath = `/uploads/${encodeURIComponent(req.file.filename)}`;

    // Crear el registro en la base de datos
    const newCandidate = await Candidate.create({
      fullName,
      phoneNumber,
      email,
      cvFilePath,
    });

    logger.info(`Nuevo candidato creado: ${newCandidate.id} - ${fullName}`);

    return res.status(201).json({
      message: 'Información guardada con éxito',
      candidate: newCandidate,
    });
  } catch (error) {
    // Manejar errores de unicidad de Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
      const fields = error.errors.map((err) => err.path);
      logger.warn(`Intento de duplicado en campos: ${fields.join(', ')}`);

      // Crear un mensaje personalizado
      const messages = fields.map((field) => {
        if (field === 'email') {
          return 'El correo electrónico ya está registrado.';
        }
        if (field === 'phoneNumber') {
          return 'El número de teléfono ya está registrado.';
        }
        return `El campo ${field} ya está registrado.`;
      });

      return res.status(409).json({ message: messages.join(' ') }); // 409 Conflict
    }

    // Manejar errores de Multer (como exceder el tamaño del archivo)
    if (error.message.includes('File too large')) {
      logger.warn('Archivo excede el tamaño permitido.');
      return res.status(400).json({ message: 'El archivo excede el tamaño máximo permitido de 5MB.' });
    }

    if (error.message.includes('Tipo de archivo no soportado')) {
      logger.warn('Tipo de archivo no soportado.');
      return res.status(400).json({ message: error.message });
    }

    logger.error('Error al crear candidato:', error);
    return res.status(500).json({ message: 'Error al guardar la información.' });
  }
};

module.exports = {
  createCandidate,
};
