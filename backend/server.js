// libraries
const express = require("express");
const dotenv = require("dotenv").config();
// errorMiddleware
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

// errorHandler Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
