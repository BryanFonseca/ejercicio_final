//const Empleado = require("../../models/empleado.model");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/http-error");
const Usuario = require("../models/usuario.model");
const Rol = require("../models/rol.model");

exports.isAuth = (req, res, next) => {
  const token = req.get("Authorization");
  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET);
    req.tokenData = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({
      status: "No se ha podido verificar el token proporcionado.",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const { id } = req.tokenData;
    const [authenticatedUser] = await Usuario.findAll({
      where: {
        id: id,
      },
      include: Rol,
    });
    // true: admin, false: docente
    if (authenticatedUser.role.nombre === "admin") {
      console.log("El usuario autenticado es administrador.");
      next();
    } else {
      throw new HttpError("El usuario loggeado no es administrador.", 401);
    }
  } catch (err) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  }
};
