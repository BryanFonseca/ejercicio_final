const sequelize = require("../../config/index");
const Sequelize = require("sequelize");

const HorasExtra = sequelize.define("horasExtras", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  aprobado: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  valorPorHora: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = HorasExtra;
