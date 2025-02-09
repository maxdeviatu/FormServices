// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createClient,
  updateClient,
  deleteClient,
  deleteClients,
  getClient,
  getClients
} = require('../controllers/clientController');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.delete('/', deleteClients);
router.get('/:id', getClient);
router.get('/', getClients);

module.exports = router;
