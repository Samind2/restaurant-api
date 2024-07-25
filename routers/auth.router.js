const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");


// ลงทะเบียนผู้ใช้
router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signup);

// เข้าสู่ระบบ
router.post("/signin", authController.signin);

module.exports = router;