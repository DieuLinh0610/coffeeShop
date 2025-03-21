const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded; // Lưu userId từ token vào req
        next();
    });
};
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); // Gán user vào req
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
module.exports = {authMiddleware, protect};
