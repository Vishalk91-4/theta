const express = require("express");
const router = express.Router();
const userController = require("../../controllers/api/users");
const authMiddleware = require("../../utils/authMiddleware");

router.post("/register", userController.createUser);

router.get("/show", authMiddleware.authenticateToken, userController.getUser);

router.put("/update", authMiddleware.authenticateToken, userController.updateUser);

router.delete("/delete", authMiddleware.authenticateToken, userController.deleteUser);

router.post("/login/email", userController.loginByEmail);

// This route is a test for authentication middleware
router.get("/auth/userData", authMiddleware.authenticateToken, userController.authTestFunction);

module.exports = router;
