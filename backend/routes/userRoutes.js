// libraries
const express = require("express");
const router = express.Router();
// controllers
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getUser);

module.exports = router;
