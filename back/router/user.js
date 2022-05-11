const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
const multer = require("../middleware/multer-config");
const password = require('../middleware/password')

//Authentification de l'utilisateur
router.post("/register", password, authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, multer, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;