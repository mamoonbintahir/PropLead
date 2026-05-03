const express = require("express");
const router = express.Router();
const { createLead, getAllLeads, updateLead, deleteLead } = require("../controllers/lead.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { validateBody } = require("../middleware/validation.middleware");

router.post("/", authMiddleware, validateBody(["name", "phone", "budget", "location", "interest"]), createLead);
router.get("/", authMiddleware, getAllLeads);
router.put("/:id", authMiddleware, updateLead);
router.delete("/:id", authMiddleware, deleteLead);

module.exports = router;
