// models/Candidate.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Candidate = sequelize.define('Candidate', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Restricción de unicidad
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Restricción de unicidad
    validate: {
      isEmail: true, // Validar formato de email
    },
  },
  cvFilePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'candidates',
});

module.exports = Candidate;
