const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacher");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
// lấy danh sách gv
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// thêm gv mới
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const teacher = new Teacher({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    });

    const newTecher = await teacher.save();
    res.status(201).json(newTecher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// cập nhật gv
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTeacher)
      return res.status(404).json({ message: "khong tim thay giao vien" });
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// xóa gv
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher)
      return res.status(404).json({ message: "khong tim thay giao vien" });
    res.json({ message: "xoa giao vien thanh cong" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
