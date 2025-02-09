// controllers/orderController.js
const Order = require('../models/Order');
const logger = require('../config/logger');

const createOrder = async (req, res) => {
  try {
    const { productId, clientId, transactionId, orderStatusId, orderTypeId, details, transactionStatus } = req.body;

    // Validar campos obligatorios
    if (!productId || !clientId || !transactionId || !orderStatusId || !orderTypeId) {
      logger.warn('Faltan campos requeridos para crear la orden.');
      return res.status(400).json({ message: 'Campos requeridos: productId, clientId, transactionId, orderStatusId, orderTypeId.' });
    }

    // Verificar que la transacción esté aprobada
    if (transactionStatus !== 'approved') {
      logger.warn('La transacción no está aprobada, no se puede crear la orden.');
      return res.status(400).json({ message: 'La transacción debe estar aprobada para crear una orden.' });
    }

    // Crear la orden en la base de datos
    const newOrder = await Order.create({
      productId,
      clientId,
      transactionId,
      orderStatusId,
      orderTypeId,
      details,
    });

    logger.info(`Orden creada con ID: ${newOrder.id}`);
    return res.status(201).json({ message: 'Orden creada exitosamente.', order: newOrder });
  } catch (error) {
    logger.error('Error al crear la orden:', error);
    return res.status(500).json({ message: 'Error al crear la orden.' });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      logger.warn(`Orden con ID ${id} no encontrada.`);
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }
    return res.status(200).json({ order });
  } catch (error) {
    logger.error('Error al obtener la orden:', error);
    return res.status(500).json({ message: 'Error al obtener la orden.' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json({ orders });
  } catch (error) {
    logger.error('Error al obtener las órdenes:', error);
    return res.status(500).json({ message: 'Error al obtener las órdenes.' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      logger.warn(`Orden con ID ${id} no encontrada para actualizar.`);
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }

    const { productId, clientId, transactionId, orderStatusId, orderTypeId, details } = req.body;
    order.productId = productId || order.productId;
    order.clientId = clientId || order.clientId;
    order.transactionId = transactionId || order.transactionId;
    order.orderStatusId = orderStatusId || order.orderStatusId;
    order.orderTypeId = orderTypeId || order.orderTypeId;
    order.details = details || order.details;

    await order.save();
    logger.info(`Orden con ID ${id} actualizada.`);
    return res.status(200).json({ message: 'Orden actualizada.', order });
  } catch (error) {
    logger.error('Error al actualizar la orden:', error);
    return res.status(500).json({ message: 'Error al actualizar la orden.' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      logger.warn(`Orden con ID ${id} no encontrada para eliminar.`);
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }

    await order.destroy();
    logger.info(`Orden con ID ${id} eliminada.`);
    return res.status(200).json({ message: 'Orden eliminada.' });
  } catch (error) {
    logger.error('Error al eliminar la orden:', error);
    return res.status(500).json({ message: 'Error al eliminar la orden.' });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
