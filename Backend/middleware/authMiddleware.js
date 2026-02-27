// This middleware is used to protect the ERP Dashboard.

const jwt = require("jsonwebtoken");
const JWT_SECRET = "erp_secret_key";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Session expired. Please login again." });
  }
};
