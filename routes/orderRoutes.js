// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Endpoint para crear una nueva orden
router.post('/', createOrder);

// Endpoint para obtener todas las órdenes
router.get('/', getOrders);

// Endpoint para obtener una orden por ID
router.get('/:id', getOrder);

// Endpoint para actualizar una orden
router.put('/:id', updateOrder);

// Endpoint para eliminar una orden
router.delete('/:id', deleteOrder);

module.exports = router;
