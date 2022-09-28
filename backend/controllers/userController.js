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
  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user using hashedPassword
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc    Login and Authenticate User
// @route   POST /api/users/login
// access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // checks for user email
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get User data
// @route   GET /api/users/me
// access   private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Current User Data" });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
