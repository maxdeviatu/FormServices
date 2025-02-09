// models/Transaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Transaction = sequelize.define('Transaction', {
  transactionNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  promotionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  taxId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentPlatform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  additionalDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'transactions',
});

module.exports = Transaction;
