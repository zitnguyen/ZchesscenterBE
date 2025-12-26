const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
// lấy danh sách ca dạy
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("teacherId studentId");
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
