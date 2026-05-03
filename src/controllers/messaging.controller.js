const { v4: uuidv4 } = require("uuid");
const db = require("../models/db");

// POST /api/messages
const sendMessage = (req, res) => {
  const { leadId, message } = req.body;

  const lead = db.leads.find((l) => l.id === leadId);
  if (!lead) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Lead not found" },
    });
  }

  const msg = { id: uuidv4(), leadId, message, status: "sent" };
  db.messages.push(msg);

  return res.status(201).json({ status: "sent" });
};

// GET /api/messages/:leadId
const getMessages = (req, res) => {
  const messages = db.messages.filter((m) => m.leadId === req.params.leadId);
  return res.status(200).json(messages);
};

module.exports = { sendMessage, getMessages };
