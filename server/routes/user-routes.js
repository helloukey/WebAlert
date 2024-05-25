const userRoute = require("express").Router();
const authCheck = require("../config/auth-check");

// profile
userRoute.get("/profile", authCheck, (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "User is authenticated",
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
});

module.exports = userRoute;
