import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "teacher" },
});

export default mongoose.model("Teacher", teacherSchema);
