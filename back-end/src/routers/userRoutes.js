const express = require('express');
const userRouter = express.Router();
const { login } = require('../controllers/userController');

// Endpoint POST để đăng nhập
userRouter.post('/login', login);

module.exports = userRouter;
