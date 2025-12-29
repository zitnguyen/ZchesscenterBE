const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Lấy danh sách chi phí
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm chi phí
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const expense = new Expense({
    month: req.body.month,
    amount: req.body.amount,
    content: req.body.content, // thêm content
  });
  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật chi phí
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        month: req.body.month,
        amount: req.body.amount,
        content: req.body.content, // cập nhật content
      },
      { new: true }
    );
    if (!updatedExpense)
      return res.status(404).json({ message: "Không tìm thấy chi phí" });
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa chi phí
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense)
      return res.status(404).json({ message: "Không tìm thấy chi phí" });
    res.json({ message: "Xóa chi phí thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
