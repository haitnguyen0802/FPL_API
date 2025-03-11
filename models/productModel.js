const express = require("express");
const router = express.Router();
const db = require("../config/database");

//Get all products
const LIMIT_ALL_PRODUCT = 9;
router.get("/", (req, res) => {
  let sql = `SELECT * FROM san_pham WHERE an_hien = 1 ORDER BY ngay ASC LIMIT 0,${LIMIT_ALL_PRODUCT}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching products: " + err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
    res.json(data);
  });
});

//Get Hot Product
const LIMIT_HOT_PRODUCT = 9;
router.get("/hot", (req, res) => {
  let sql = `SELECT * FROM san_pham WHERE an_hien = 1 AND hot = 1 ORDER BY ngay DESC LIMIT 0,${LIMIT_HOT_PRODUCT}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching hot products: " + err);
      return res.status(500).json({ error: "Failed to fetch hot products" });
    }
    res.json(data);
  });
});

//GET product By ID
const LIMIT_PRODUCT_BYID = 9;
router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  
  let sql = `SELECT * FROM san_pham WHERE id_loai = ? AND an_hien = 1 ORDER BY ngay ASC LIMIT 0,${LIMIT_PRODUCT_BYID}`;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching products by ID: " + err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
    if (!data.length) {
      return res.status(404).json({ error: "No products found for this category" });
    }
    res.json(data);
  });
});

module.exports = router;
