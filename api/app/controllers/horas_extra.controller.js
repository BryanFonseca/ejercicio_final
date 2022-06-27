const horasExtraService = require("../services/horas_extra.service");

exports.findAll = (req, res, next) => {
  horasExtraService.findAll(req, res, next);
};

exports.agregar = (req, res, next) => {
  horasExtraService.agregar(req, res, next);
};

exports.aprobar = (req, res, next) => {
  horasExtraService.aprobar(req, res, next);
};
