const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String }, // Lưu mật khẩu đã mã hóa
    createdAt: { type: Date, default: Date.now },
    phoneNumber: { type: Number },
    location: { type: String },
    image: { type: String },
    gender: { type: Boolean },
    dateOfBirth: { type: Date },
    role: { type: String }
});

// Mã hóa mật khẩu trước khi lưu vào database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);
