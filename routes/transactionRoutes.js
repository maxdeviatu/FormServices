// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionStatistics
} = require('../controllers/transactionController');

router.use(authMiddleware);

router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/', getTransactions);
router.get('/statistics', getTransactionStatistics);

module.exports = router;
