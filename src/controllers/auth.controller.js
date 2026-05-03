const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const { JWT_SECRET } = require("../middleware/auth.middleware");

// POST /api/auth/register
const register = (req, res) => {
  const { name, email, password } = req.body;

  const existing = db.users.find((u) => u.email === email);
  if (existing) {
    return res.status(409).json({
      error: { code: 409, message: "Conflict", details: "Email already exists" },
    });
  }

  const hashed = bcrypt.hashSync(password, 10);
  const id = uuidv4();
  const user = { id, name, email, password: hashed };
  db.users.push(user);

  const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "1d" });
  return res.status(201).json({ id, email, token });
};

// POST /api/auth/login
const login = (req, res) => {
  const { email, password } = req.body;

  const user = db.users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "User not found" },
    });
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    return res.status(401).json({
      error: { code: 401, message: "Unauthorized", details: "Wrong password" },
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
  return res.status(200).json({ token });
};

module.exports = { register, login };
