const jwt = require("jsonwebtoken");
const User = require("../models/User"); // hoặc đường dẫn model user của bạn

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Bạn cần đăng nhập" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token không hợp lệ" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra user tồn tại trong DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Tài khoản đã bị xóa" });
    }

    req.user = { id: user._id, role: user.role }; // lưu thông tin user vào req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token hết hạn hoặc không hợp lệ" });
  }
};

// Middleware kiểm tra admin
const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Bạn cần đăng nhập" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới được phép" });
  }
  next();
};

// Middleware kiểm tra teacher
const verifyTeacher = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Bạn cần đăng nhập" });
  }

  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Chỉ teacher mới được phép" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin, verifyTeacher };
