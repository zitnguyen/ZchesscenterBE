const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// GET tất cả giáo viên
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST thêm giáo viên
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new User({
      name,
      email,
      password: hashedPassword,
      role: "teacher",
    });

    await teacher.save();
    res.status(201).json({ message: "Giáo viên đã được tạo", teacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT cập nhật giáo viên
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updatedTeacher = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");
    if (!updatedTeacher)
      return res.status(404).json({ message: "Không tìm thấy giáo viên" });

    res.json({ message: "Cập nhật thành công", updatedTeacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE xóa giáo viên
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy giáo viên" });

    res.json({ message: "Xóa giáo viên thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
