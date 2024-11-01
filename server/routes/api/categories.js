const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/api/categories");
const authMiddleware = require("../../utils/authMiddleware");

router.get("/show", authMiddleware.authenticateToken, categoryController.getCategory);

module.exports = router;
