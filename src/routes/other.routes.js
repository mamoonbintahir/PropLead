const express = require("express");

// --- Scoring ---
const scoringRouter = express.Router();
const { scoreLead } = require("../controllers/scoring.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
scoringRouter.post("/:leadId", authMiddleware, scoreLead);

// --- Messaging ---
const messagingRouter = express.Router();
const { sendMessage, getMessages } = require("../controllers/messaging.controller");
const { validateBody } = require("../middleware/validation.middleware");
messagingRouter.post("/", authMiddleware, validateBody(["leadId", "message"]), sendMessage);
messagingRouter.get("/:leadId", authMiddleware, getMessages);

// --- Dashboard ---
const dashboardRouter = express.Router();
const { getDashboardStats } = require("../controllers/dashboard.controller");
dashboardRouter.get("/", authMiddleware, getDashboardStats);

// --- Property ---
const propertyRouter = express.Router();
const { addProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } = require("../controllers/property.controller");
propertyRouter.post("/", authMiddleware, validateBody(["title", "location", "price", "type"]), addProperty);
propertyRouter.get("/", authMiddleware, getAllProperties);
propertyRouter.get("/:id", authMiddleware, getPropertyById);
propertyRouter.put("/:id", authMiddleware, updateProperty);
propertyRouter.delete("/:id", authMiddleware, deleteProperty);

// --- Appointment ---
const appointmentRouter = express.Router();
const { bookAppointment, getAllAppointments, updateAppointmentStatus, cancelAppointment } = require("../controllers/appointment.controller");
appointmentRouter.post("/", authMiddleware, validateBody(["leadId", "propertyId", "date", "timeSlot"]), bookAppointment);
appointmentRouter.get("/", authMiddleware, getAllAppointments);
appointmentRouter.put("/:id/status", authMiddleware, validateBody(["status"]), updateAppointmentStatus);
appointmentRouter.delete("/:id", authMiddleware, cancelAppointment);

module.exports = { scoringRouter, messagingRouter, dashboardRouter, propertyRouter, appointmentRouter };
