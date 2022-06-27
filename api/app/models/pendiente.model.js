const sequelize = require("../../config/index");
const Sequelize = require("sequelize");

const Pendiente = sequelize.define("pendientes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Pendiente;
