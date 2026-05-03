const express = require("express");
const rateLimit = require("express-rate-limit");
const { loggingMiddleware, errorMiddleware } = require("./middleware/error.middleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const leadRoutes = require("./routes/lead.routes");
const {
  scoringRouter,
  messagingRouter,
  dashboardRouter,
  propertyRouter,
  appointmentRouter,
} = require("./routes/other.routes");

const app = express();

// ─── Global Middleware ────────────────────────────────
app.use(express.json());
app.use(loggingMiddleware);

// Rate Limiting (optional but added as per spec)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: { code: 429, message: "Too many requests, please try again later." } },
});
app.use(limiter);

// ─── Routes ──────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/scoring", scoringRouter);
app.use("/api/messages", messagingRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/appointments", appointmentRouter);

// ─── Health Check ─────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "PropLead AI API is running 🚀", version: "1.0.0" });
});

// ─── 404 Handler ──────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: { code: 404, message: "Route not found" } });
});

// ─── Error Handler ────────────────────────────────────
app.use(errorMiddleware);

// ─── Start Server ─────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ PropLead AI server running on http://localhost:${PORT}`);
});

module.exports = app;
