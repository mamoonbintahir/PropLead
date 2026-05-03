// Logging Middleware
const loggingMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Centralized Error Handling Middleware
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      code: err.status || 500,
      message: err.message || "Internal Server Error",
      details: err.details || null,
    },
  });
};

module.exports = { loggingMiddleware, errorMiddleware };
