const db = require("../models/db");
const { calculateScore } = require("../utils/scoring");

// POST /api/scoring/:leadId
const scoreLead = (req, res) => {
  const lead = db.leads.find((l) => l.id === req.params.leadId);
  if (!lead) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Lead not found" },
    });
  }

  lead.score = calculateScore(lead);
  return res.status(200).json({ leadId: lead.id, score: lead.score });
};

module.exports = { scoreLead };
