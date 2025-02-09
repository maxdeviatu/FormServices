// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Order = sequelize.define('Order', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderStatusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'orders',
});

module.exports = Order;
