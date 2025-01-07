// routes/candidateRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createCandidate } = require('../controllers/candidateController');

// Ruta para crear un nuevo candidato
router.post('/', upload.single('cv'), createCandidate);

module.exports = router;
