const jwt = require("jsonwebtoken");
const HttpError = require("../utils/http-error");
const Usuario = require("../models/usuario.model");
const Pendiente = require("../models/pendiente.model");
const Rol = require("../models/rol.model");
const bcrypt = require("bcryptjs");

const helpers = require("../utils/helpers");

exports.login = async (req, res, next) => {
  try {
    const { user, password } = req.body;
    helpers
      .validate(user)
      .isRequired(new HttpError("No se ha especificado el usuario.", 401))
      .isString(new HttpError("El nombre de usuario debe ser un string.", 401));

    helpers
      .validate(password)
      .isRequired(new HttpError("No se ha especificado la contraseña.", 401))
      .isString(new HttpError("La contraseña debe ser un string.", 401));

    const [usuarioEncontrado] = await Usuario.findAll({
      where: {
        user,
      },
      include: Rol,
    });

    if (!usuarioEncontrado) throw new HttpError("Usuario no encontrado.", 401);

    const isEqual = await bcrypt.compare(password, usuarioEncontrado.pass);

    if (!isEqual) throw new HttpError("Credenciales incorrectas.", 401);

    const key = process.env.AUTH_SECRET;

    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        nombre: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellidos}`,
      },
      key,
      {
        expiresIn: "1h",
      }
    );

    /*
    res.status(200).json({
      id: usuarioEncontrado.id,
      nombres: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellidos}`,
      isAdmin: usuarioEncontrado.rol,
      token,
    });
    */
    res.status(200).json({
      id: usuarioEncontrado.id,
      nombres: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellidos}`,
      rol: usuarioEncontrado.role.nombre,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.singup = async (req, res, next) => {
  try {
    const { nombre, apellidos, user, password, rol } = req.body;
    console.log(nombre, apellidos, user, password, rol);
    helpers
      .validate(user)
      .isRequired(new HttpError("No se ha especificado el usuario.", 401))
      .isString(new HttpError("El nombre de usuario debe ser un string.", 401));

    helpers
      .validate(password)
      .isRequired(new HttpError("No se ha especificado la contraseña.", 401))
      .isString(new HttpError("La contraseña debe ser un string.", 401));

    const usuarios = await Usuario.findAll();
    const noEsUnico = usuarios.some((usuario) => usuario.user === user);
    if (noEsUnico) throw new HttpError("Ya existe ese nombre de usuario.");

    const rolesDisponibles = await Rol.findAll();
    const esRolValido = rolesDisponibles.some(({ nombre }) => nombre === rol);
    if (!esRolValido) throw new HttpError("El rol especificado no es válido.");
    if (rol === "admin")
      throw new HttpError("Solo puede existir un administrador.");

    const [rolEncontrado] = await Rol.findAll({
      where: {
        nombre: rol,
      },
    });

    const hashedPass = await bcrypt.hash(password, 12);

    if (rol === "jefe") {
      // se crea un usuario empleado y se agrega a la tabla pendientes
      // si se aprueba de la tabla pendientes, se actualizará su rol
      const usuarioCreado = await Usuario.create({
        nombre,
        apellidos,
        user,
        pass: hashedPass,
        // se agrega como un empleado
        roleId: 3,
        //roleId: rolEncontrado.id,
      });

      const pendienteCreado = await Pendiente.create({
        roleId: rolEncontrado.id,
        usuarioId: usuarioCreado.id,
      });

      res.status(200).json({
        id: usuarioCreado.id,
        mensaje:
          "Espera a que el administrador apruebe tu rol de jefe, mientras tanto eres un empleado.",
      });
      return;
    } else if (rol === "empleado") {
      // si el usuario quiere ser un empleado, no hace falta confirmación del administrador
      const usuarioCreado = await Usuario.create({
        nombre,
        apellidos,
        user,
        pass: hashedPass,
        roleId: rolEncontrado.id,
      });
      res.status(200).json({
        id: usuarioCreado.id,
      });
    }
  } catch (err) {
    next(err);
  }
};
