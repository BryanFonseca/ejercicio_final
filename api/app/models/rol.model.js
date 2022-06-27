const sequelize = require("../../config/index");
const Sequelize = require("sequelize");

const Rol = sequelize.define("roles", {
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
});

module.exports = Rol;
