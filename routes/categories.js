const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const sql = `SELECT * FROM loai WHERE an_hien = 1 ORDER BY thu_tu ASC`;
    const [categories] = await db.query(sql);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;
