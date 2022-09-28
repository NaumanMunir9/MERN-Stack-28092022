// libraries
const express = require("express");
const router = express.Router();
// controllers
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
// middleware
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

module.exports = router;
