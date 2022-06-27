const sequelize = require("../../config/index");
const Sequelize = require("sequelize");

const Usuario = sequelize.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apellidos: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pass: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;
