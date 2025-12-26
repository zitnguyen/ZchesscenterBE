import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  date: String,
  time: String,
});

export default mongoose.model("Schedule", scheduleSchema);
