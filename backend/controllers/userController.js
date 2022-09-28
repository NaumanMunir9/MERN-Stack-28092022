// @desc    Register New User
// @route   POST /api/users
// access   Public
const registerUser = (req, res) => {
  res.status(200).json({ message: "User has been Registered" });
};

// @desc    Login User
// @route   POST /api/users/login
// access   Public
const loginUser = (req, res) => {
  res.status(200).json({ message: "User has been Logged In" });
};

// @desc    Get User data
// @route   GET /api/users/me
// access   Public
const getUser = (req, res) => {
  res.status(200).json({ message: "Current User Data" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
