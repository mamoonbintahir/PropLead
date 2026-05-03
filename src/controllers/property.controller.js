const { v4: uuidv4 } = require("uuid");
const db = require("../models/db");

// POST /api/properties
const addProperty = (req, res) => {
  const { title, location, price, type, status } = req.body;

  if (typeof price !== "number") {
    return res.status(400).json({
      error: { code: 400, message: "Bad Request", details: "Price must be a number" },
    });
  }

  const property = {
    id: uuidv4(),
    title,
    location,
    price,
    type,       // e.g., "apartment", "house", "plot"
    status: status || "available",
    createdBy: req.user.id,
  };

  db.properties.push(property);
  return res.status(201).json({ id: property.id, message: "Property added successfully" });
};

// GET /api/properties
const getAllProperties = (req, res) => {
  let properties = db.properties;
  const { type, status } = req.query;

  if (type) properties = properties.filter((p) => p.type === type);
  if (status) properties = properties.filter((p) => p.status === status);

  return res.status(200).json(properties);
};

// GET /api/properties/:id
const getPropertyById = (req, res) => {
  const property = db.properties.find((p) => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Property not found" },
    });
  }
  return res.status(200).json(property);
};

// PUT /api/properties/:id
const updateProperty = (req, res) => {
  const index = db.properties.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Property not found" },
    });
  }

  db.properties[index] = { ...db.properties[index], ...req.body };
  return res.status(200).json({ message: "Property updated", property: db.properties[index] });
};

// DELETE /api/properties/:id
const deleteProperty = (req, res) => {
  const index = db.properties.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      error: { code: 404, message: "Not Found", details: "Property not found" },
    });
  }

  db.properties.splice(index, 1);
  return res.status(200).json({ message: "Property deleted" });
};

module.exports = { addProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty };
