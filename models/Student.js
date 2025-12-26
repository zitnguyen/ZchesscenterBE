const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    level: { type: String, required: true },
  },
  { timestamps: true }
); // thêm createdAt và updatedAt

module.exports = mongoose.model("Student", studentSchema);
