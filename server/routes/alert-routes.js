const alertRoute = require("express").Router();
const authCheck = require("../config/auth-check");
const Alert = require("../models/alert");
const { performScraping } = require("../performScraping");

// get alerts
alertRoute.get("/alerts", authCheck, async (req, res) => {
  const { id } = req.user;

  try {
    const alerts = await Alert.find({ user: id });
    res.status(200).send({ alerts: alerts });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: error.message });
  }
});

// send alert
alertRoute.post("/alert", authCheck, async (req, res) => {
  const { id } = req.user;
  const { url, selector } = req.body;

  try {
    // scrap data
    const scrapValue = await performScraping(browser, url, selector);
    if (!scrapValue) {
      return res
        .status(400)
        .send({ error: "Unable to retrieve data from the selector" });
    }
    // update alert if already available or else create new one
    const alert = Alert.findOne({ url: url });
    if (alert) {
      await Alert.findByIdAndUpdate(alert.id, { lastValue: scrapValue });
      return res.status(200).send({ message: "Updated alert data" });
    } else {
      await Alert.create({ user: id, url, selector, lastValue: scrapValue });
      return res.status(200).send({ message: "Added alert data" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
