const { v4: uuidv4 } = require("uuid");
const db = require("../models/db");

// POST /api/appointments
const bookAppointment = (req, res) => {
  const { leadId, propertyId, date, timeSlot } = req.body;

  const lead = db.leads.find((l) => l.id === leadId);
  if (!lead) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Lead not found" },
    });
  }

  const property = db.properties.find((p) => p.id === propertyId);
  if (!property) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Property not found" },
    });
  }

  const appointment = {
    id: uuidv4(),
    leadId,
    propertyId,
    date,
    timeSlot,
    status: "scheduled",
    agentId: req.user.id,
  };

  db.appointments.push(appointment);
  return res.status(201).json({ id: appointment.id, status: "scheduled" });
};

// GET /api/appointments
const getAllAppointments = (req, res) => {
  return res.status(200).json(db.appointments);
};

// PUT /api/appointments/:id/status
const updateAppointmentStatus = (req, res) => {
  const index = db.appointments.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Appointment not found" },
    });
  }

  const { status } = req.body;
  const validStatuses = ["scheduled", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      error: { code: 400, message: "Bad Request", details: `Status must be one of: ${validStatuses.join(", ")}` },
    });
  }

  db.appointments[index].status = status;
  return res.status(200).json({ message: "Status updated", appointment: db.appointments[index] });
};

// DELETE /api/appointments/:id
const cancelAppointment = (req, res) => {
  const index = db.appointments.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Appointment not found" },
    });
  }

  db.appointments.splice(index, 1);
  return res.status(200).json({ message: "Appointment cancelled" });
};

module.exports = { bookAppointment, getAllAppointments, updateAppointmentStatus, cancelAppointment };
