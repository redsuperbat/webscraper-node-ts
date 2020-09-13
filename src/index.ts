import  puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: true,       args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
       ]});
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.pdf({path: 'google.pdf'});

  await browser.close();
})();