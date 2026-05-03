const db = require("../models/db");

// GET /api/dashboard
const getDashboardStats = (req, res) => {
  const totalLeads = db.leads.length;
  const hotLeads = db.leads.filter((l) => l.score >= 70).length;
  const conversionRate =
    totalLeads === 0 ? 0 : parseFloat(((hotLeads / totalLeads) * 100).toFixed(2));

  return res.status(200).json({ totalLeads, hotLeads, conversionRate });
};

module.exports = { getDashboardStats };
