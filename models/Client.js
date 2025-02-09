// models/Client.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Client = sequelize.define('Client', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  documentTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'clients',
});

module.exports = Client;
