const authService = require("../services/authentication.service");

exports.login = (req, res, next) => {
  authService.login(req, res, next);
};

exports.singup = (req, res, next) => {
  authService.singup(req, res, next);
};
