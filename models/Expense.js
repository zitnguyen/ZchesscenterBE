const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    content: { type: String, required: true }, // thêm trường nội dung
  },
  { timestamps: true } // tự động thêm createdAt và updatedAt
);

module.exports = mongoose.model("Expense", expenseSchema);
