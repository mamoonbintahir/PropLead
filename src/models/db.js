// In-memory database (no actual DB needed for lab mid)
const db = {
  users: [],
  leads: [],
  messages: [],
  properties: [],   // Property Actor module
  appointments: [], // Appointment Actor module
};

module.exports = db;
