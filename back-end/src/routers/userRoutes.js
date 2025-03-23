const express = require('express');
const userRouter = express.Router();
const { login, updateUser, getAllUsers, createUser, deleteUser, loginAdmin } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Endpoint POST để đăng nhập
userRouter.post('/login', login);
userRouter.put("/update/:userId", updateUser);
userRouter.get("/", getAllUsers);
userRouter.post("/create", createUser);
userRouter.delete("/:id", deleteUser);
userRouter.post('/login/admin', loginAdmin);

module.exports = userRouter;
