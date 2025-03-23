const express = require('express');
const categoryRoutes = require('./CategoryRouter');
const productRoutes = require('./ProductRouter');
const userRouter = require('./userRoutes');
const cartRouter = require('./cartRouter');
const authMiddleware = require('../middleware/authMiddleware');
const favoriteRouter = require("./favoriteRouter");
const orderRoutes = require("./orderRoutes");

const router = express.Router();
router.use('/categories', categoryRoutes);
router.use('/products' ,productRoutes);
router.use('/users', userRouter)
router.use("/cart", cartRouter);
router.use("/favorites", favoriteRouter);
router.use("/orders", orderRoutes);

module.exports = router;
