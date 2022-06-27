const horasExtraController = require("../app/controllers/horas_extra.controller");
const { body } = require("express-validator/check");

const HorasExtra = require("../app/models/horasExtra.model");
const { dummyMiddleware } = require("./helpers");
const router = require("express").Router();
const auth = require("../app/middlewares/is_auth");

// solo accesible por admin
// /horas-extra/all
router.get("/all", auth.isAuth, horasExtraController.findAll);

router.post("/agregar", /*auth.isAuth,*/ horasExtraController.agregar);

router.post("/aprobar", auth.isAuth, horasExtraController.aprobar);

module.exports = router;
