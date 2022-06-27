const HttpError = require("../utils/http-error");

module.exports = (err, req, res, next) => {
  if (req.headersSent) {
    return next(err);
  }

  // si el error es mi clase custom, se retorna al cliente el mensaje de error
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  // si el error es "lógico" Express usa su error handler por defecto
  next(err);
};
