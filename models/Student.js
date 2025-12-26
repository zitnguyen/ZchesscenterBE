import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  level: String,
});

export default mongoose.model("Student", studentSchema);
