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
// thêm gv mới
router.post("/", async (req, res) => {
    try{
        const teacher = new Teacher({
            name:req.body.name,
            email:req.body.email,
            role: req.body.role
    });
    try{
        const newTecher = await teacher.save();
        res.status(201).json(newTecher);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
    });
    