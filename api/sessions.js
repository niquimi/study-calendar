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

// GET all study sessions for a specific month
router.get("/month", (req, res) => {
    const { year, month } = req.query;
    if (!year || !month) {
      return res.status(400).json({ error: "Year and month are required" });
    }
  
    const firstDay = `${year}-${month}-01`;
    const lastDay = `${year}-${month}-31`;
  
    const query = `
      SELECT 
        id, subject_id, 
        DATE_FORMAT(session_date, '%Y-%m-%d') AS session_date, 
        start_time, duration, title, description 
      FROM study_sessions 
      WHERE session_date BETWEEN ? AND ?
    `;

    db.query(query, [firstDay, lastDay], (err, results) => {
      if (err) {
        console.error("Error fetching study sessions:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
});  

// DELETE a study session
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        db.query("DELETE FROM study_sessions WHERE id = ?", [id], (err, result) => {
            if (err) {
              console.error("Error deleting session:", err);
              return res.status(500).json({ success: false, message: "Failed to delete session" });
            }
            if (result.affectedRows === 0) {
              return res.status(404).json({ success: false, message: "Session not found" });
            }
            res.json({ success: true, message: "Session deleted successfully" });
        });          
    } catch (error) {
      console.error("Error deleting session:", error);
      res.status(500).json({ success: false, message: "Failed to delete session" });
    }
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