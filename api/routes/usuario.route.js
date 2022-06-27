const usuarioController = require("../app/controllers/usuario.controller");
const { dummyMiddleware } = require("./helpers");
const auth = require("../app/middlewares/is_auth");

const router = require("express").Router();

// /usuarios/all
router.get("/all", usuarioController.findAll);

// solo accesible por admin
router.get(
  "/pendientes",
  auth.isAuth,
  auth.isAdmin,
  usuarioController.findAllPendientes
);

router.post(
  "/aprobar",
  [
    // validar que el usuario existe en la tabla pendientes
  ],
  usuarioController.aprobarPendiente
);

// un usuario agrega a otro como su empleado
router.post(
  "/agregarEmpleado",
  [
    // validar que el empleado y el jefe existen
    // validar que el empleado es empleado
    // validar que el jefe, es jefe
  ],
  usuarioController.agregarEmpleadoAJefe
);

module.exports = router;
