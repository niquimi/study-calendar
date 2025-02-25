const express = require("express");
const path = require("path");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Test DB connection
db.query("SELECT 1", (err) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Database connection successful.");
    }
});

// Parse JSON bodies for API endpoints
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "./public")));

// Mount the API endpoints
app.use("/api/subjects", require("./api/subjects"));
app.use("/api/study_sessions", require("./api/sessions"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});