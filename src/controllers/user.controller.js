const db = require("../models/db");

// GET /api/users/me
const getProfile = (req, res) => {
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "User not found" },
    });
  }
  return res.status(200).json({ id: user.id, name: user.name, email: user.email });
};

module.exports = { getProfile };
