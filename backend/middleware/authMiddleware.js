// libraries
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
// models
const userModel = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token
      req.user = await userModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Invalid Token. User is not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Token not found. User is not authorized");
  }
});

module.exports = protect;
