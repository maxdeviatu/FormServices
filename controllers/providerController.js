// controllers/providerController.js
const Provider = require('../models/Provider');
const logger = require('../config/logger');

const createProvider = async (req, res) => {
  try {
    const { name, documentTypeId, document, email, phone, website, notes } = req.body;
    if (!name || !documentTypeId || !document || !email || !phone) {
      logger.warn('Campos requeridos faltantes para crear el proveedor.');
      return res.status(400).json({ message: 'Se requieren: name, documentTypeId, document, email y phone.' });
    }
    
    const newProvider = await Provider.create({
      name, documentTypeId, document, email, phone, website, notes
    });
    
    logger.info(`Proveedor creado con ID: ${newProvider.id}`);
    return res.status(201).json({ message: 'Proveedor creado exitosamente.', provider: newProvider });
  } catch (error) {
    logger.error('Error al crear el proveedor:', error);
    return res.status(500).json({ message: 'Error al crear el proveedor.' });
  }
};

const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByPk(id);
    if (!provider) {
      logger.warn(`Proveedor con ID ${id} no encontrado para actualizar.`);
      return res.status(404).json({ message: 'Proveedor no encontrado.' });
    }
    
    const { name, documentTypeId, document, email, phone, website, notes } = req.body;
    provider.name = name || provider.name;
    provider.documentTypeId = documentTypeId || provider.documentTypeId;
    provider.document = document || provider.document;
    provider.email = email || provider.email;
    provider.phone = phone || provider.phone;
    provider.website = website || provider.website;
    provider.notes = notes || provider.notes;
    
    await provider.save();
    logger.info(`Proveedor con ID ${id} actualizado.`);
    return res.status(200).json({ message: 'Proveedor actualizado exitosamente.', provider });
  } catch (error) {
    logger.error('Error al actualizar el proveedor:', error);
    return res.status(500).json({ message: 'Error al actualizar el proveedor.' });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByPk(id);
    if (!provider) {
      logger.warn(`Proveedor con ID ${id} no encontrado para eliminar.`);
      return res.status(404).json({ message: 'Proveedor no encontrado.' });
    }
    
    await provider.destroy();
    logger.info(`Proveedor con ID ${id} eliminado.`);
    return res.status(200).json({ message: 'Proveedor eliminado exitosamente.' });
  } catch (error) {
    logger.error('Error al eliminar el proveedor:', error);
    return res.status(500).json({ message: 'Error al eliminar el proveedor.' });
  }
};

const deleteProviders = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      logger.warn('IDs de proveedores no proporcionados o en formato incorrecto para eliminación múltiple.');
      return res.status(400).json({ message: 'Debe proporcionar un array de IDs.' });
    }
    await Provider.destroy({ where: { id: ids } });
    logger.info(`Proveedores eliminados: ${ids.join(', ')}`);
    return res.status(200).json({ message: 'Proveedores eliminados exitosamente.' });
  } catch (error) {
    logger.error('Error al eliminar múltiples proveedores:', error);
    return res.status(500).json({ message: 'Error al eliminar múltiples proveedores.' });
  }
};

const getProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll();
    return res.status(200).json({ providers });
  } catch (error) {
    logger.error('Error al obtener los proveedores:', error);
    return res.status(500).json({ message: 'Error al obtener los proveedores.' });
  }
};

module.exports = {
  createProvider,
  updateProvider,
  deleteProvider,
  deleteProviders,
  getProviders
};
