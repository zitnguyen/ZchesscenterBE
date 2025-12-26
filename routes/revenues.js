const express = require("express");
const router = express.Router();
const Revenue = require("../models/Revenue");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Lấy danh sách doanh thu (có thể cho tất cả user xem)
router.get("/", verifyToken, async (req, res) => {
  try {
    const revenues = await Revenue.find();
    res.json(revenues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm doanh thu (chỉ admin)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
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

// Cập nhật doanh thu (chỉ admin)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedRevenue = await Revenue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRevenue)
      return res.status(404).json({ message: "không tìm thấy doanh thu" });
    res.json(updatedRevenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa doanh thu (chỉ admin)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deletedRevenue = await Revenue.findByIdAndDelete(req.params.id);
    if (!deletedRevenue)
      return res.status(404).json({ message: "không tìm thấy doanh thu" });
    res.json({ message: "xóa doanh thu thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
