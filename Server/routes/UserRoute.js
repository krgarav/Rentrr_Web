const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.post("/register", UserController.registerUser);
router.post("/login-user", UserController.authenticateUser);
router.post("/verify", UserController.sendVerificationEmail);
router.get("/verify-token", UserController.verifyEmail);
module.exports = router;
