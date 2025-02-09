// models/Provider.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Provider = sequelize.define('Provider', {
  name: {
    type: DataTypes.STRING,
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'providers',
});

module.exports = Provider;
