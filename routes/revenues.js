const express = require("express");
const router = express.Router();
const Revenue = require("../models/Revenue");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Lấy danh sách doanh thu (populate studentId để lấy tên học sinh)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const revenues = await Revenue.find().populate("studentId", "name");
    res.json(revenues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm doanh thu (chỉ admin)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const { month, amount, studentId } = req.body;
  const revenue = new Revenue({
    month,
    amount,
    studentId,
  });
  try {
    const newRevenue = await revenue.save();
    const populatedRevenue = await newRevenue.populate("studentId", "name");
    res.status(201).json(populatedRevenue);
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
    ).populate("studentId", "name");

    if (!updatedRevenue)
      return res.status(404).json({ message: "Không tìm thấy doanh thu" });

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
      return res.status(404).json({ message: "Không tìm thấy doanh thu" });

    res.json({ message: "Xóa doanh thu thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
