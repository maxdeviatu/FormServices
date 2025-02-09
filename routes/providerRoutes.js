// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createProvider,
  updateProvider,
  deleteProvider,
  deleteProviders,
  getProviders
} = require('../controllers/providerController');

router.use(authMiddleware);

router.post('/', createProvider);
router.put('/:id', updateProvider);
router.delete('/:id', deleteProvider);
router.delete('/', deleteProviders);
router.get('/', getProviders);

module.exports = router;
