const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Lấy danh sách tất cả user
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
    }
};

// Thêm user mới
const createUser = async (req, res) => {
    try {
      const { userName, email, password, phoneNumber, location, gender, role } = req.body;
  
      // Kiểm tra email đã tồn tại chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã được sử dụng!" });
      }
  
      // Mã hóa mật khẩu
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      // Chuyển đổi gender sang Boolean
      let genderBoolean;
      if (gender === "male") genderBoolean = true;
      else if (gender === "female") genderBoolean = false;
      else genderBoolean = null; // Hoặc có thể mặc định là `false`
  
      // Tạo user mới
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
        phoneNumber,
        location,
        gender: genderBoolean, // Lưu dưới dạng Boolean
        role,
      });
  
      await newUser.save();
      res.status(201).json({ message: "Thêm user thành công!", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
  };
  
//xoá người dùng
const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
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

const loginAdmin = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Kiểm tra người dùng có tồn tại không
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: "Email hoặc mật khẩu không chính xác" });
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Email hoặc mật khẩu không chính xác" });
      }

      // Kiểm tra quyền admin
      if (user.role !== "admin") {
          return res.status(403).json({ message: "Bạn không có quyền truy cập" });
      }

      // Tạo token JWT
      const accessToken = jwt.sign(
          { userId: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
          { userId: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "14d" }
      );

      // Trả về thông tin người dùng
      res.status(200).json({
          id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
          accessToken,
          refreshToken
      });
  } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      res.status(500).json({ error: "Lỗi máy chủ" });
  }
};


module.exports = { login, updateUser, getAllUsers , createUser, deleteUser, loginAdmin};
