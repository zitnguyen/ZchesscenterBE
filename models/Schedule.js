const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // sửa từ "Teacher" → "User"
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // sửa từ "Student" → "User"
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
