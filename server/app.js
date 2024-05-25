require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { initiateBrowser } = require("./performScraping");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const authRoute = require("./routes/auth-routes");
const userRoute = require("./routes/user-routes");
const session = require("express-session");

// app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(
  session({
    cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: process.env.COOKIE_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());
let browser = null;

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth routes
app.use("/auth", authRoute);

// user routes
app.use("/user", userRoute);

// server
const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    browser = await initiateBrowser();
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
      mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to MongoDB");
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

init();
