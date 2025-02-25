const express = require("express");
const router = express.Router();
const db = require("../db.js");

// POST /api/subjects
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Subject name is required" });
  }

  const query = "INSERT INTO subjects (name) VALUES (?)";
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error("Error inserting subject:", err);
      return res.status(500).json({ error: "Database error" });
    }
    // Return the inserted subject's id and name
    res.status(201).json({ id: results.insertId, name });
  });
});

module.exports = router;