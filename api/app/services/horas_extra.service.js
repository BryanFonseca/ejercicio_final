const HorasExtra = require("../models/horasExtra.model");
const Rol = require("../models/rol.model");
const Usuario = require("../models/usuario.model");
const helpers = require("../utils/helpers");
const HttpError = require("../utils/http-error");

exports.agregar = async (req, res, next) => {
  try {
    const { usuarioId, cantidad } = req.body;

    const horaExtraCreada = await HorasExtra.create({
      usuarioId,
      cantidad,
      fecha: helpers.getCurrentDate(),
      aprobado: false,
    });

    res.status(200).json({
      mensaje: "Horas extras por aprobar.",
    });
  } catch (err) {
    next(err);
  }
};

exports.aprobar = async (req, res, next) => {
  try {
    // se asume que se llega acá solo autenticado
    const usuarioId = req.tokenData.id;
    // el id del usuario al que se le aprobaran sus horas
    const { usuarioAprobarId, valorPorHora } = req.body;
    const [usuario] = await Usuario.findAll({
      where: {
        id: usuarioId,
      },
      include: Rol,
    });

    if (usuario.role.nombre === "jefe") {
      // si el usuario es jefe, puede aprobar solo la de sus empleados
      const [empleado] = await Usuario.findAll({
        where: {
          id: usuarioAprobarId,
          jefeId: usuarioId,
        },
      });
      if (!empleado) throw new HttpError("No se ha encontrado empleado.");
      // se aprueban todas las horas extras de ese empleado
      await HorasExtra.update(
        { aprobado: true, valorPorHora },
        {
          where: {
            usuarioId: empleado.id,
          },
        }
      );
      res.status(200).json({
        mensaje: "Horas extras de empleado aprobadas con éxito.",
      });
    }

    if (usuario.role.nombre === "admin") {
      // si el usuario es admin, puede aprobar solo la de los jefes
      const [empleado] = await Usuario.findAll({
        where: {
          id: usuarioAprobarId,
        },
        include: Rol,
      });
      if (!empleado) throw new HttpError("No se ha encontrado jefe.");
      if (empleado.role.nombre !== "jefe")
        throw new HttpError("Solo se puede aprobar horas de jefes.");
      await HorasExtra.update(
        { aprobado: true, valorPorHora },
        {
          where: {
            usuarioId: empleado.id,
          },
        }
      );
      res.status(200).json({
        mensaje: "Horas extras de jefe aprobadas con éxito.",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const usuarioId = req.tokenData.id;
    const [usuario] = await Usuario.findAll({
      where: {
        id: usuarioId,
      },
      include: Rol,
    });

    if (usuario.role.nombre === "admin") {
      const horasExtras = await HorasExtra.findAll();
      // debería extraer esta función
      const horasExtrasParsed = horasExtras.map((horaExtra) => ({
        fecha: horaExtra.fecha,
        cantidad: horaExtra.cantidad,
        aprobado: horaExtra.aprobado,
        valorPorHora: horaExtra.valorPorHora,
      }));
      res.status(200).json({
        data: horasExtrasParsed,
      });
    } else if (usuario.role.nombre === "jefe") {
      console.log("heree");
      const horasExtras = await HorasExtra.findAll({
        where: {
          "$usuario.jefeId$": usuarioId,
        },
        include: Usuario,
      });
      const horasExtraParsed = horasExtras.map((horaExtra) => ({
        fecha: horaExtra.fecha,
        cantidad: horaExtra.cantidad,
        aprobado: horaExtra.aprobado,
        valorPorHora: horaExtra.valorPorHora,
      }));
      res.status(200).json({
        data: horasExtraParsed,
      });
    }
  } catch (err) {
    next(err);
  }
};
