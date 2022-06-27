const {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect,
  port,
  pool,
} = require("./db_config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect,
  port,
  define: {
    freezeTableName: true,
  },
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

module.exports = sequelize;
