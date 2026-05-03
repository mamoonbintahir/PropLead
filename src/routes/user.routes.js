const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/me", authMiddleware, getProfile);

module.exports = router;
