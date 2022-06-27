const Pendiente = require("../models/pendiente.model");
const Rol = require("../models/rol.model");
const Usuario = require("../models/usuario.model");
const HttpError = require("../utils/http-error");

exports.findAll = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      include: Rol,
    });
    const usuariosParsed = usuarios.map((usuario) => ({
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      rol: usuario.role.nombre,
    }));
    res.status(200).json({
      data: usuariosParsed,
    });
  } catch (err) {
    next(err);
  }
};

exports.findAllPendientes = async (req, res, next) => {
  try {
    const pendientes = await Pendiente.findAll({
      include: [{ model: Usuario }, { model: Rol }],
    });
    console.log(JSON.stringify(pendientes, null, 2));
    const pendientesParsed = pendientes.map((pendiente) => ({
      id: pendiente.id,
      rol: {
        id: pendiente.role.id,
        nombre: pendiente.role.nombre,
      },
      usuario: {
        id: pendiente.usuario.id,
        nombre: pendiente.usuario.nombre,
        apellidos: pendiente.usuario.apellidos,
      },
    }));
    res.status(200).json({
      data: pendientesParsed,
    });
  } catch (err) {
    next(err);
  }
};

exports.aprobarPendiente = async (req, res, next) => {
  try {
    // se eliminan de la tabla pendiente
    const { usuarioId } = req.body;
    const [pendiente] = await Pendiente.findAll({
      where: {
        usuarioId,
      },
    });
    // se le asigna el rol que solicitó
    await Usuario.update(
      { roleId: pendiente.roleId },
      {
        where: {
          id: usuarioId,
        },
      }
    );

    const pendienteEliminado = await Pendiente.destroy({
      where: {
        usuarioId,
      },
    });
    if (!pendienteEliminado) throw new HttpError("No se pudo aprobar");
    res.status(200).json({
      mensaje: "Usuario aprobado.",
    });
  } catch (err) {
    next(err);
  }
};

exports.agregarEmpleadoAJefe = async (req, res, next) => {
  try {
    const { jefeId, empleadoId } = req.body;

    const [posibleEmpleado] = await Usuario.findAll({
      where: {
        id: empleadoId,
      },
      include: Rol,
    });

    if (
      posibleEmpleado.role.nombre === "jefe" ||
      posibleEmpleado.role.nombre === "admin"
    ) {
      throw new HttpError(
        "Un jefe no puede tener otro jefe o admin como empleado."
      );
    }

    // se tiene una self-referencing relationship, así que se actualiza el registro original
    const empleadoActualizado = await Usuario.update(
      { jefeId },
      {
        where: {
          id: empleadoId,
        },
      }
    );
    console.log(empleadoActualizado);
    res.status(200).json({
      mensaje: "Empleado asignado a jefe con éxito.",
    });
  } catch (err) {
    next(err);
  }
};
