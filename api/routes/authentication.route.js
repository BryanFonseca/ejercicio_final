const authController = require("../app/controllers/authentication.controller");
const { dummyMiddleware } = require("./helpers");

const router = require("express").Router();

// /auth/login
router.post("/login", authController.login);

// /auth/singup
router.post("/signup", authController.singup);

module.exports = router;
