// Import the Nodemailer library
const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: process.env.MAIL_TRIP_USER,
    pass: process.env.MAIL_TRIP_PASS,
  },
});

// Send the email
const sendEmail = async (to, subject, text) => {
  transporter.sendMail({ from: "alert@kunalukey.com", to: to, subject: subject, text: text }, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendEmail;
