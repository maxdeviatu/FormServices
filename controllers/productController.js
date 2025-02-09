// controllers/productController.js
const Product = require('../models/Product');
const logger = require('../config/logger');

const createProduct = async (req, res) => {
  try {
    const { name, brandId, providerId, description, reference, priceWithTax, additionalDetails } = req.body;
    if (!name || !reference || !priceWithTax) {
      logger.warn('Campos requeridos faltantes para crear el producto.');
      return res.status(400).json({ message: 'Se requieren al menos: name, reference y priceWithTax.' });
    }
    
    const newProduct = await Product.create({
      name, brandId, providerId, description, reference, priceWithTax, additionalDetails
    });
    
    logger.info(`Producto creado con ID: ${newProduct.id}`);
    return res.status(201).json({ message: 'Producto creado exitosamente.', product: newProduct });
  } catch (error) {
    logger.error('Error al crear el producto:', error);
    return res.status(500).json({ message: 'Error al crear el producto.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      logger.warn(`Producto con ID ${id} no encontrado para actualizar.`);
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    
    const { name, brandId, providerId, description, reference, priceWithTax, additionalDetails } = req.body;
    product.name = name || product.name;
    product.brandId = brandId !== undefined ? brandId : product.brandId;
    product.providerId = providerId !== undefined ? providerId : product.providerId;
    product.description = description || product.description;
    product.reference = reference || product.reference;
    product.priceWithTax = priceWithTax || product.priceWithTax;
    product.additionalDetails = additionalDetails || product.additionalDetails;
    
    await product.save();
    logger.info(`Producto con ID ${id} actualizado.`);
    return res.status(200).json({ message: 'Producto actualizado exitosamente.', product });
  } catch (error) {
    logger.error('Error al actualizar el producto:', error);
    return res.status(500).json({ message: 'Error al actualizar el producto.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      logger.warn(`Producto con ID ${id} no encontrado para eliminar.`);
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    
    await product.destroy();
    logger.info(`Producto con ID ${id} eliminado.`);
    return res.status(200).json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    logger.error('Error al eliminar el producto:', error);
    return res.status(500).json({ message: 'Error al eliminar el producto.' });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      logger.warn('IDs de productos no proporcionados o en formato incorrecto para eliminación múltiple.');
      return res.status(400).json({ message: 'Debe proporcionar un array de IDs.' });
    }
    await Product.destroy({ where: { id: ids } });
    logger.info(`Productos eliminados: ${ids.join(', ')}`);
    return res.status(200).json({ message: 'Productos eliminados exitosamente.' });
  } catch (error) {
    logger.error('Error al eliminar múltiples productos:', error);
    return res.status(500).json({ message: 'Error al eliminar múltiples productos.' });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      logger.warn(`Producto con ID ${id} no encontrado.`);
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    return res.status(200).json({ product });
  } catch (error) {
    logger.error('Error al obtener el producto:', error);
    return res.status(500).json({ message: 'Error al obtener el producto.' });
  }
};

const getProducts = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Product.findAndCountAll({ offset, limit });
    return res.status(200).json({ total: count, page, limit, products: rows });
  } catch (error) {
    logger.error('Error al obtener los productos:', error);
    return res.status(500).json({ message: 'Error al obtener los productos.' });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  getProduct,
  getProducts
};
