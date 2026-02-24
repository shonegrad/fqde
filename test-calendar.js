const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));
    
    await page.goto('http://localhost:5173/fqde/events');
    await page.waitForSelector('button[aria-label="calendar view"]');
    await page.click('button[aria-label="calendar view"]');
    await page.waitForTimeout(2000);
    await browser.close();
})();
