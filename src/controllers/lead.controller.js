const { v4: uuidv4 } = require("uuid");
const db = require("../models/db");
const { calculateScore } = require("../utils/scoring");

// POST /api/leads
const createLead = (req, res) => {
  const { name, phone, budget, location, interest } = req.body;

  if (typeof budget !== "number") {
    return res.status(400).json({
      error: { code: 400, message: "Bad Request", details: "Budget must be a number" },
    });
  }

  const score = calculateScore({ budget, location, interest });
  const lead = { id: uuidv4(), name, phone, budget, location, interest, score };
  db.leads.push(lead);

  return res.status(201).json({ id: lead.id, score: lead.score });
};

// GET /api/leads
const getAllLeads = (req, res) => {
  let leads = db.leads;
  const { filter } = req.query;

  if (filter === "hot") {
    leads = leads.filter((l) => l.score >= 70);
  } else if (filter === "warm") {
    leads = leads.filter((l) => l.score >= 40 && l.score < 70);
  } else if (filter === "cold") {
    leads = leads.filter((l) => l.score < 40);
  }

  return res.status(200).json(
    leads.map(({ id, name, score }) => ({ id, name, score }))
  );
};

// PUT /api/leads/:id
const updateLead = (req, res) => {
  const index = db.leads.findIndex((l) => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Lead not found" },
    });
  }

  db.leads[index] = { ...db.leads[index], ...req.body };
  // Recalculate score after update
  db.leads[index].score = calculateScore(db.leads[index]);

  return res.status(200).json({ message: "Lead updated", lead: db.leads[index] });
};

// DELETE /api/leads/:id
const deleteLead = (req, res) => {
  const index = db.leads.findIndex((l) => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Lead not found" },
    });
  }

  db.leads.splice(index, 1);
  return res.status(200).json({ message: "Lead deleted successfully" });
};

module.exports = { createLead, getAllLeads, updateLead, deleteLead };
