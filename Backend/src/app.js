const express = require("express");
require('dotenv').config();
const UserRoute = require("../src/routes/user.route");
const cookieParser = require("cookie-parser");
const reviewRoute = require("../src/routes/review.route");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// API ENDPOINTS
app.use("/api/user", UserRoute);
// AI ENDPOINTS
app.use("/api/reviews", reviewRoute);

module.exports = app;
