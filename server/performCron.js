const schedule = require("node-schedule");
const Alert = require("./models/alert");
const sendEmail = require("./mail");
const { performScraping } = require("./performScraping");

const performCron = async (browser) => {
  const job = schedule.scheduleJob("* * * * *", async () => {
    const alerts = await Alert.find({ status: "active" }).populate("user");

    // Iterate over all alerts and perform the scraping
    alerts.forEach(async (alert) => {
      // Scrape the website
      const { url, selector } = alert;
      const newValue = await performScraping(browser, url, selector);

      // Compare the new value with the last value
      if (newValue !== alert.lastValue) {
        // Update the alert with the new value
        await Alert.findByIdAndUpdate(alert.id, {
          $set: { lastValue: newValue, status: "completed" },
        });

        // Send an email to the user
        sendEmail(
          alert.user.email,
          "Hey! The Value Changed.",
          `The new value for the URL ${url} is ${newValue}, old value was ${alert.lastValue}`
        );
      }
    });
  });

  return job;
};

module.exports = performCron;
