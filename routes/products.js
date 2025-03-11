const express = require("express");
const router = express.Router();
const db = require("../config/database");

const LIMIT_ALL_PRODUCT = 9;
router.get("/", async (req, res) => {
  try {
    const sql = `SELECT * FROM san_pham WHERE an_hien = 1 ORDER BY ngay ASC LIMIT 0,${LIMIT_ALL_PRODUCT}`;
    const [products] = await db.query(sql);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;