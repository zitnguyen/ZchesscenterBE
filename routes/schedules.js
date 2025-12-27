const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
const { verifyToken } = require("../middleware/auth");

/**
 * GET /schedules
 * - Admin: thấy tất cả
 * - Teacher: chỉ thấy ca dạy của mình
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    let query = {};

    // nếu là teacher → chỉ lấy ca dạy của teacher đó
    if (req.user.role === "teacher") {
      query.teacherId = req.user.id;
    }

    const schedules = await Schedule.find(query)
      .populate("teacherId", "name")
      .populate("studentId", "name");

    // map dữ liệu cho FE dễ dùng
    const result = schedules.map((s) => ({
      _id: s._id,
      teacherName: s.teacherId?.name,
      studentName: s.studentId?.name,
      date: s.date,
      time: s.time,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /schedules
 * Thêm ca dạy (Admin)
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const newSchedule = new Schedule({
      teacherId: req.body.teacherId,
      studentId: req.body.studentId,
      date: req.body.date,
      time: req.body.time,
    });

    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PUT /schedules/:id
 */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Không tìm thấy ca dạy" });
    }

    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /schedules/:id
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Không tìm thấy ca dạy" });
    }

    res.json({ message: "Xóa ca dạy thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
