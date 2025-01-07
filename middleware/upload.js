// middleware/upload.js
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Evitar colisiones usando timestamp y un slug del nombre original
    const timestamp = Date.now();
    // Extraer la extensión del archivo
    const ext = path.extname(file.originalname);
    // Extraer el nombre sin extensión
    const name = path.basename(file.originalname, ext);
    // Crear un slug del nombre, reemplazando espacios y caracteres especiales
    const safeName = slugify(name, {
      lower: true,      // Convertir a minúsculas
      strict: true,     // Eliminar caracteres no alfanuméricos
      remove: /[*+~.()'"!:@]/g // Eliminar caracteres adicionales si es necesario
    });
    // Construir el nombre final del archivo
    cb(null, `${timestamp}-${safeName}${ext}`);
  }
});

// Filtrar tipos de archivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no soportado. Solo se permiten PDF y DOC/DOCX.'));
  }
};

// Configuración de Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limitar tamaño a 5MB
  }
});

module.exports = upload;
