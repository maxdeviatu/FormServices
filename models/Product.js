// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo',
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priceWithTax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  additionalDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'products',
});

module.exports = Product;
