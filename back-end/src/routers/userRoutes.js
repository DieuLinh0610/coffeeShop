const express = require('express');
const userRouter = express.Router();
const { login, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Endpoint POST để đăng nhập
userRouter.post('/login', login);
userRouter.put("/update/:userId", updateUser);
module.exports = userRouter;
