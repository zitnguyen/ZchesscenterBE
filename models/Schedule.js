const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
); // tự động thêm createdAt và updatedAt

module.exports = mongoose.model("Schedule", scheduleSchema);
