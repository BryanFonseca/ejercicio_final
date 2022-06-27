require("dotenv").config();
const sequelize = require("./config/index");
const Usuario = require("./app/models/usuario.model");
const Rol = require("./app/models/rol.model");
const bcrypt = require("bcryptjs");

// es necesario volver a definir las relaciones
Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);

async function init() {
  try {
    await sequelize.sync();
    const pass = "admin@admin.com";
    const hashedPass = await bcrypt.hash(pass, 12);

    // roles
    await Rol.bulkCreate([
      {
        // rol id 1
        nombre: "admin",
      },
      {
        // rol id 2
        nombre: "jefe",
      },
      {
        // rol id 3
        nombre: "empleado",
      },
    ]);

    /////////////USUARIO////////////////
    await Usuario.bulkCreate([
      {
        nombre: "AdminNombre",
        apellidos: "AdminApellidos",
        user: "administrador",
        pass: hashedPass,
        roleId: 1,
      },
    ]);
    console.log("Admin creado correctamente.");
  } catch (err) {
    console.log(err.message);
  } finally {
    process.exit();
  }
}

init();
