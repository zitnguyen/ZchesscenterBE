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
// thêm doanh thu
router.post("/", async (req, res) => {
  const revenue = new Revenue({
    month: req.body.month,
    amount: req.body.amount,
  });
  try {
    const newRevenue = await revenue.save();
    res.status(201).json(newRevenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// cập nhật doanh thu
router.put("/:id", async (req, res) => {
  try {
    const updatedRevenue = await Revenue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRevenue)
      return res.status(404).json({ message: "khong tim thay doanh thu" });
    res.json(updatedRevenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
