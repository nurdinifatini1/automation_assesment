require('dotenv').config();
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // optional: set a longer timeout for slower pages
    page.setDefaultTimeout(30000);

    await page.goto('https://practicesoftwaretesting.com/auth/login');

    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;

    if (!email || !password) {
      throw new Error('TEST_EMAIL and TEST_PASSWORD must be set in .env');
    }

    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);

    await page.click('button[type="submit"]', { force: true });

    // wait for account name
    await page.waitForSelector('.account-name');

    const username = await page.textContent('.account-name');
    console.log('✅ Logged in as:', username?.trim() || '(no name found)');

  } catch (err) {
    console.error(' Test failed:', err.message);
  } finally {
   // await browser.close();
  }
})();
