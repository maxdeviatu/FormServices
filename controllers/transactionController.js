// controllers/transactionController.js
const Transaction = require('../models/Transaction');
const logger = require('../config/logger');

const createTransaction = async (req, res) => {
  try {
    const { transactionNumber, productId, clientId, promotionId, taxId, paymentMethod, paymentPlatform, currency, amount, status, additionalDetails } = req.body;
    if (!transactionNumber || !productId || !clientId || !taxId || !paymentMethod || !paymentPlatform || !currency || !amount || !status) {
      logger.warn('Campos requeridos faltantes para crear la transacción.');
      return res.status(400).json({ message: 'Faltan campos requeridos para la transacción.' });
    }
    
    const newTransaction = await Transaction.create({
      transactionNumber, productId, clientId, promotionId, taxId, paymentMethod, paymentPlatform, currency, amount, status, additionalDetails
    });
    
    logger.info(`Transacción creada con ID: ${newTransaction.id}`);
    return res.status(201).json({ message: 'Transacción creada exitosamente.', transaction: newTransaction });
  } catch (error) {
    logger.error('Error al crear la transacción:', error);
    return res.status(500).json({ message: 'Error al crear la transacción.' });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      logger.warn(`Transacción con ID ${id} no encontrada para actualizar.`);
      return res.status(404).json({ message: 'Transacción no encontrada.' });
    }
    
    // Se actualizan, por ejemplo, el estado y detalles adicionales
    const { status, additionalDetails } = req.body;
    if (status) transaction.status = status;
    if (additionalDetails) transaction.additionalDetails = additionalDetails;
    
    await transaction.save();
    logger.info(`Transacción con ID ${id} actualizada.`);
    return res.status(200).json({ message: 'Transacción actualizada exitosamente.', transaction });
  } catch (error) {
    logger.error('Error al actualizar la transacción:', error);
    return res.status(500).json({ message: 'Error al actualizar la transacción.' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      logger.warn(`Transacción con ID ${id} no encontrada para eliminar.`);
      return res.status(404).json({ message: 'Transacción no encontrada.' });
    }
    
    await transaction.destroy();
    logger.info(`Transacción con ID ${id} eliminada.`);
    return res.status(200).json({ message: 'Transacción eliminada exitosamente.' });
  } catch (error) {
    logger.error('Error al eliminar la transacción:', error);
    return res.status(500).json({ message: 'Error al eliminar la transacción.' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    return res.status(200).json({ transactions });
  } catch (error) {
    logger.error('Error al obtener las transacciones:', error);
    return res.status(500).json({ message: 'Error al obtener las transacciones.' });
  }
};

const getTransactionStatistics = async (req, res) => {
  try {
    // Ejemplo simple de agregación
    const totalTransactions = await Transaction.count();
    const totalAmount = await Transaction.sum('amount');
    
    return res.status(200).json({ totalTransactions, totalAmount });
  } catch (error) {
    logger.error('Error al obtener las estadísticas de transacciones:', error);
    return res.status(500).json({ message: 'Error al obtener las estadísticas de transacciones.' });
  }
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionStatistics
};
