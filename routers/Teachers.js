const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
// lấy danh sách gv
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
