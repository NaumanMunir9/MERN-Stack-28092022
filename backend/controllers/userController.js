// libraries
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
// Models
const userModel = require("../models/userModel");

// @desc    Register New User
// @route   POST /api/users
// access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if none of the fields are empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All are required fields.");
  }

  // check if the user exists in the db
  const userExists = await userModel.findOne(email);

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  res.status(200).json({ message: "User has been Registered" });
});

// @desc    Login User
// @route   POST /api/users/login
// access   Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User has been Logged In" });
});

// @desc    Get User data
// @route   GET /api/users/me
// access   Public
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Current User Data" });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
