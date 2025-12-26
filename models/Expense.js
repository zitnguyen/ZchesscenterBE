const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
); // tùy chọn, thêm createdAt và updatedAt

module.exports = mongoose.model("Expense", expenseSchema);
