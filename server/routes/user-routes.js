const userRoute = require("express").Router();

// profile
userRoute.get("/profile",  (req, res) => {
  if (req.user) {
    res.status(200).json({
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
