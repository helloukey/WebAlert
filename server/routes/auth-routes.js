require("dotenv").config();
const authRoute = require("express").Router();
const passport = require("passport");

// auth logout
authRoute.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect(process.env.FRONTEND_URL);
});

// auth with google
authRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// login failed
authRoute.get("/failed", (req, res) => {
  res.status(401).json({
    message: "Failed to login",
  });
});

// callback route for google to redirect to
authRoute.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/auth/failed",
  })
);

module.exports = authRoute;
