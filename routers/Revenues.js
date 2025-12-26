const express = require("express");
const router = express.Router();
const Revenue = require("../models/Revenue");
// lấy danh sách doanh thu
router.get("/", async (req, res) => {
  try {
    const revenues = await Revenue.find();
    res.json(revenues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
