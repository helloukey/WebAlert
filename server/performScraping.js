const { default: puppeteer } = require("puppeteer");

const initiateBrowser = async () => {
  const browser = await puppeteer.launch();
  return browser;
};

const performScraping = async (browser, url, selector) => {
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.$(selector);
  const result = await page.evaluate((el) => el.textContent, data);

  await page.close();
  return result;
};

module.exports = { initiateBrowser, performScraping };
