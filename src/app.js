const express = require('express');
const UserRoute = require('../src/routes/user.route')
const cookieParser = require("cookie-parser");
const reviewRoute = require('../src/routes/review.route')

const app = express();

app.use(express.json());
app.use(cookieParser());

// API ENDPOINTS
app.use('/api/user',UserRoute)
// AI ENDPOINTS
app.use('/api/reviews', reviewRoute);

module.exports = app; 