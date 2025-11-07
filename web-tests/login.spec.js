const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false }); // set false to see browser
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1️⃣ Navigate to login page
    await page.goto('https://practicesoftwaretesting.com/auth/login', { timeout: 30000 });

    // 2️⃣ Wait for email input and fill
    await page.waitForSelector('input[type="email"]', { timeout: 30000 });
    await page.fill('input[type="email"]', 'customer@practicesoftwaretesting.com');

    // 3️⃣ Wait for password input and fill
    await page.waitForSelector('input[type="password"]', { timeout: 30000 });
    await page.fill('input[type="password"]', 'welcome01');

    // 4️⃣ Click login and wait for navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button[type="submit"]')
    ]);

    // 5️⃣ Wait for account name to appear
    await page.waitForSelector('.account-name', { timeout: 30000 });

    // 6️⃣ Get username text
    const username = await page.textContent('.account-name');

    // 7️⃣ Simple check
    if (username && username.trim() === 'Jane Doe') {
      console.log('✅ Login successful, username verified: ' + username.trim());
      await browser.close();
      process.exit(0);
    } else {
      throw new Error('Username did not match. Found: ' + username);
    }

  } catch (err) {
    console.error('❌ Test failed:', err.message);

    // 8️⃣ Take screenshot on failure
    const screenshotsDir = path.resolve(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

    try {
      const screenshotPath = path.join(screenshotsDir, `failure-${Date.now()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log('Screenshot saved to:', screenshotPath);
    } catch (sErr) {
      console.error('Could not take screenshot:', sErr.message);
    }

    await browser.close();
    process.exit(1);
  }
})();
