const express = require("express");
const router = express.Router();
const db = require("../db.js");

// GET study sessions for a specific date (YYYY-MM-DD)
router.get("/", (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }
  const query = "SELECT * FROM study_sessions WHERE session_date = ?";
  db.query(query, [date], (err, results) => {
    if (err) {
      console.error("Error fetching study sessions:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// POST a new study session
router.post("/", (req, res) => {
  const { subject_id, session_date, start_time, duration, title, description } = req.body;
  if (!subject_id || !session_date || !start_time || !duration || !title) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const query = "INSERT INTO study_sessions (subject_id, session_date, start_time, duration, title, description) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [subject_id, session_date, start_time, duration, title, description], (err, results) => {
    if (err) {
      console.error("Error creating study session:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ id: results.insertId });
  });
});

module.exports = router;