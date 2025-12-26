const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // lưu hashed password
  role: { type: String, enum: ["admin", "teacher"], default: "teacher" },
});

module.exports = mongoose.model("User", userSchema);
