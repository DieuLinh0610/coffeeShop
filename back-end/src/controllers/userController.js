const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng nhập
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        
        // Kiểm tra người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Tạo token JWT
        const accessToken = jwt.sign({ userId: user._id, email: user.email , role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1 days' // Token hết hạn sau 1 giờ
        });

        const refreshToken = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '14 days' // Token hết hạn sau 1 giờ
        });

        const userInfo = {
            id: user._id,
            name: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            location: user.location,
            image: user.image,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            coin: user.coin,
        }
        res.status(200).json({
            userInfo,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(" Error in login:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { login };
