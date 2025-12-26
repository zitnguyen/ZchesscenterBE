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
// thêm ca dạy mới
router.post("/", async (req, res) => {
  const Schedule = new Schedule({
    teacherId: req.body.teacherId,
    studentId: req.body.studentId,
    date: req.body.date,
    time: req.body.time,
  });
  try {
    const newSchedule = await Schedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// cập nhật ca dạy
router.put("/:id", async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSchedule)
      return res.status(404).json({ message: "khong tim thay ca day" });
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// xóa ca dạy
router.delete("/:id", async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule)
      return res.status(404).json({ message: "khong tim thay ca day" });
    res.json({ message: "xoa ca day thanh cong" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
