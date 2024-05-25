require("dotenv").config();

// auth check
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect(process.env.FRONTEND_URL + "");
  } else {
    next();
  }
};

module.exports = authCheck;
