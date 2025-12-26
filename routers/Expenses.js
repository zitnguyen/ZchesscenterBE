const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
// lấy danh sách chi phí
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// thêm chi phí
router.post("/", async (req, res) => {
  const expense = new Expense({
    month: req.body.month,
    amount: req.body.amount,
  });
  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
