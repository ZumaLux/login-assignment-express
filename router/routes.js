const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

router.get("/", controller.getHome);
router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);
router.get("/logout", controller.getLogout);
// Protected
router.get("/students", controller.isAuth, controller.getStudents);

module.exports = router;
