const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // adds user info to request object
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
