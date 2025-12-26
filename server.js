require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const teacherRouter = require("./routes/teacher");
const studentRouter = require("./routes/student");
const scheduleRouter = require("./routes/schedules");
const revenueRouter = require("./routes/revenues");
const expenseRouter = require("./routes/expenses");
const authRouter = require("./routes/Auth");

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
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/revenues", revenueRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/auth", authRouter);

// Lắng nghe cổng
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
