// controllers/clientController.js
const Client = require('../models/Client');
const logger = require('../config/logger');

const createClient = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, addressId, documentTypeId, document, birthDate, sex, gender } = req.body;
    
    // Validar que se envíen todos los campos obligatorios
    if (!firstName || !lastName || !phone || !email || !addressId || !documentTypeId || !document || !birthDate || !sex || !gender) {
      logger.warn('Faltan campos requeridos para crear el cliente.');
      return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados.' });
    }
    
    const newClient = await Client.create({
      firstName, lastName, phone, email, addressId, documentTypeId, document, birthDate, sex, gender
    });
    
    logger.info(`Cliente creado con ID: ${newClient.id}`);
    return res.status(201).json({ message: 'Cliente creado exitosamente.', client: newClient });
  } catch (error) {
    logger.error('Error al crear el cliente:', error);
    return res.status(500).json({ message: 'Error al crear el cliente.' });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      logger.warn(`Cliente con ID ${id} no encontrado para actualizar.`);
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    
    const { firstName, lastName, phone, email, addressId, documentTypeId, document, birthDate, sex, gender } = req.body;
    client.firstName = firstName || client.firstName;
    client.lastName = lastName || client.lastName;
    client.phone = phone || client.phone;
    client.email = email || client.email;
    client.addressId = addressId || client.addressId;
    client.documentTypeId = documentTypeId || client.documentTypeId;
    client.document = document || client.document;
    client.birthDate = birthDate || client.birthDate;
    client.sex = sex || client.sex;
    client.gender = gender || client.gender;
    
    await client.save();
    logger.info(`Cliente con ID ${id} actualizado.`);
    return res.status(200).json({ message: 'Cliente actualizado exitosamente.', client });
  } catch (error) {
    logger.error('Error al actualizar el cliente:', error);
    return res.status(500).json({ message: 'Error al actualizar el cliente.' });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      logger.warn(`Cliente con ID ${id} no encontrado para eliminar.`);
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    
    await client.destroy();
    logger.info(`Cliente con ID ${id} eliminado.`);
    return res.status(200).json({ message: 'Cliente eliminado exitosamente.' });
  } catch (error) {
    logger.error('Error al eliminar el cliente:', error);
    return res.status(500).json({ message: 'Error al eliminar el cliente.' });
  }
};

const deleteClients = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      logger.warn('IDs de clientes no proporcionados o en formato incorrecto para eliminación múltiple.');
      return res.status(400).json({ message: 'Debe proporcionar un array de IDs.' });
    }
    
    await Client.destroy({ where: { id: ids } });
    logger.info(`Clientes eliminados: ${ids.join(', ')}`);
    return res.status(200).json({ message: 'Clientes eliminados exitosamente.' });
  } catch (error) {
    logger.error('Error al eliminar múltiples clientes:', error);
    return res.status(500).json({ message: 'Error al eliminar múltiples clientes.' });
  }
};

const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      logger.warn(`Cliente con ID ${id} no encontrado.`);
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    return res.status(200).json({ client });
  } catch (error) {
    logger.error('Error al obtener el cliente:', error);
    return res.status(500).json({ message: 'Error al obtener el cliente.' });
  }
};

const getClients = async (req, res) => {
  try {
    // Ejemplo simple de paginación: ?page=1&limit=10
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Client.findAndCountAll({ offset, limit });
    return res.status(200).json({ total: count, page, limit, clients: rows });
  } catch (error) {
    logger.error('Error al obtener los clientes:', error);
    return res.status(500).json({ message: 'Error al obtener los clientes.' });
  }
};

module.exports = {
  createClient,
  updateClient,
  deleteClient,
  deleteClients,
  getClient,
  getClients
};
