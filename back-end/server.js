const express = require('express');
const { connect } = require('mongoose');
const router = require('./src/routers/index.js');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// Middleware để parse JSON từ request body
app.use(express.json());

// Nếu gửi dữ liệu dạng application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
connect(MONGODB_URI);

app.use('/', router);

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
