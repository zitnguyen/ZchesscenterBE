const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// lấy danh sách học viên
router.get("/", verifyToken, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// lấy học viên theo id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//thêm học viên
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const { name, age, level } = req.body;
  const student = new Student({ name, age, level });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//cập nhật học viên
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Not found" });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//xóa học viên
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
