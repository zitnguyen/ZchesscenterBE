const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // sửa từ "Student" → "User"
    required: true,
  },
});

module.exports = mongoose.model("Revenue", revenueSchema);
