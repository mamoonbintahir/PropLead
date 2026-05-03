const jwt = require("jsonwebtoken");
const JWT_SECRET = "proplead_secret_key_2024";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: { code: 401, message: "Unauthorized", details: "No token provided" },
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: { code: 401, message: "Unauthorized", details: "Invalid or expired token" },
    });
  }
};

module.exports = { authMiddleware, JWT_SECRET };
