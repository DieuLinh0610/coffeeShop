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
            userName: user.userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            location: user.location,
            image: user.image,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            coin: user.coin,
        }
        res.status(200).json({
            ...userInfo,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(" Error in login:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Cập nhật thông tin người dùng

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params; // Lấy ID từ URL
        const { userName, phoneNumber, location, gender, dateOfBirth } = req.body;

        // Kiểm tra user có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Cập nhật thông tin người dùng
        user.userName = userName || user.userName;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.location = location || user.location;
        user.gender = gender !== undefined ? gender : user.gender;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;

        // Lưu thay đổi vào database
        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login, updateUser };
