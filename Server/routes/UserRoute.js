const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/register", UserController.registerUser);
router.post("/login-user", UserController.authenticateUser);
router.get("/logout-user", UserController.logoutUser);
router.post("/verify", UserController.sendVerificationEmail);
router.get("/verify-token", UserController.verifyEmail);

router.get("/check-auth", authenticateToken, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user, // this will have id, email, role etc. from the token
  });
});
router.get("/api/auth/me", UserController.getCurrentUser);

router.get("/all-users", authenticateToken, UserController.getAllUsers);

module.exports = router;
