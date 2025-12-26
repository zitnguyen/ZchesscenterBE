require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const teacherRouter = require("./routes/Teachers");
const studentRouter = require("./routes/Student");
const scheduleRouter = require("./routes/Schedules");
const revenueRouter = require("./routes/Revenues");
const expenseRouter = require("./routes/Expenses");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Gắn router vào app
app.use("/api/teachers", teacherRouter);
app.use("/api/students", studentRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/revenues", revenueRouter);
app.use("/api/expenses", expenseRouter);

// Lắng nghe cổng
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
