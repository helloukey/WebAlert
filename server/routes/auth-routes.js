const authRoute = require("express").Router();
const passport = require("passport");

// auth login
authRoute.get("/login", (req, res) => {
  res.send("Login page");
});

// auth logout
authRoute.get("/logout", (req, res) => {
  res.send("Logging out");
});

// auth with google
authRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
authRoute.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/user/profile");
  }
);

module.exports = authRoute;
