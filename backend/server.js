// libraries
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
// errorMiddleware
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

// config/db
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// errorHandler Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
