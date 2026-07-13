const jwt = require("jsonwebtoken");
const User = require("../models/User"); // apne actual path/naam se match karo

async function authMiddleware(req, res, next) {
  try {
    // 1. Cookie se token lo
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    // 2. Token verify karo
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Session expired. Please log in again.",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    // 3. User DB se fetch karo (password field ke bina)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again.",
      });
    }

    // 4. req.user me attach karo, aage badho
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed: " + err.message,
    });
  }
}

module.exports = authMiddleware;