// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  getProduct,
  getProducts
} = require('../controllers/productController');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.delete('/', deleteProducts);
router.get('/:id', getProduct);
router.get('/', getProducts);

module.exports = router;
