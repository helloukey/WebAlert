const userRoute = require("express").Router();
const authCheck = require("../config/auth-check");

// profile
userRoute.get("/profile", authCheck, (req, res) => {
  res.send("Profile page");
});

module.exports = userRoute;
