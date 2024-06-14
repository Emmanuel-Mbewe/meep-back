const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
    try {
        // Get token from cookies or headers
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded; // Attach user data to request object
        next(); // Call next middleware
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

const restrict = roles => async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: "Forbidden: You are not authorized" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    authenticate,
    restrict
};
