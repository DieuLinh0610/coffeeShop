const express = require('express');
const categoryRoutes = require('./CategoryRouter');
const productRoutes = require('./ProductRouter');
const userRouter = require('./userRoutes');


const router = express.Router();
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/users', userRouter)

module.exports = router;
