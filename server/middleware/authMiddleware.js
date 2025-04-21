const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.cookies.token; //  use cookie, not header

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //  add to req
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
