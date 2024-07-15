const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

//Creat a user
router.post("/signup", authController.signup);


module.exports = router;