const userRoute = require("express").Router();

// auth check
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

// profile
userRoute.get("/profile", authCheck, (req, res) => {
  res.send("Profile page");
});

module.exports = userRoute;
