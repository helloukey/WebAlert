require("dotenv").config();
const express = require("express");
const { performScraping, initiateBrowser } = require("./performScraping");
const authRoute = require("./routes/auth-routes");
const userRoute = require("./routes/user-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require("express-session");
const passport = require("passport");

// app
const app = express();
app.use(express.json());
app.use(
  cookieSession({
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    secret: [process.env.COOKIE_KEY],
    resave: false,
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

// scrape route
app.get("/scrape", async (req, res) => {
  const { url, selector } = req.body;
  try {
    const result = await performScraping(browser, url, selector);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
