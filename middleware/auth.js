const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Bạn cần đăng nhập" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token không hợp lệ" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // lưu thông tin user (id, role) vào req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token hết hạn hoặc không hợp lệ" });
  }
};

// Middleware kiểm tra admin
const verifyAdmin = (req, res, next) => {
  // Kiểm tra xem req.user có tồn tại không
  if (!req.user) {
    return res.status(401).json({ message: "Bạn cần đăng nhập" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới được phép" });
  }
  next();
};

// Middleware kiểm tra teacher (nếu cần)
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
