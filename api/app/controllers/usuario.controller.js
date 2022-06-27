const usuarioService = require("../services/usuario.service");

exports.findAll = (req, res, next) => {
  usuarioService.findAll(req, res, next);
};

exports.findAllPendientes = (req, res, next) => {
  usuarioService.findAllPendientes(req, res, next);
};

exports.aprobarPendiente = (req, res, next) => {
  usuarioService.aprobarPendiente(req, res, next);
};

exports.agregarEmpleadoAJefe = (req, res, next) => {
  usuarioService.agregarEmpleadoAJefe(req, res, next);
};
