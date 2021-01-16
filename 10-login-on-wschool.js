/*
*version : https://github.com/yamilesquivel
*/
const puppeteer = require('puppeteer');
const FORM = {
    URL: 'https://www.linkedin.com/login/es?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin',
    PASSWORD_SELECTOR: 'input[name="session_password"]',
    REPEAT_PASSWORD_SELECTOR: 'input[name="psw-repeat"]',
    BUTTON_SELECTOR: '.btn__primary--large from__button--floating',
    EMAIL_SELECTOR: 'input[name="session_key"]',
};

const CREDENTIALS = {
    USERNAME: 'dummy@dummy.com',
    PASSWORD: 'dummy'
};

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(FORM.URL, {waitUntil: 'networkidle0'});
  /* This form is inside iframe, so we will using iframe reference. 
  You can use page reference if your form in not inside iframe. Example given in demo3.js */
  
  const frames = await page.frames();
  let iframe = frames.find(f => f.name() === 'iframeResult');  const email = await iframe.$(FORM.EMAIL_SELECTOR);
  await email.click();
  await page.keyboard.type(CREDENTIALS.USERNAME);  const password = await iframe.$(FORM.PASSWORD_SELECTOR);
  await password.click();
  await page.keyboard.type(CREDENTIALS.PASSWORD);  const rPassword = await iframe.$(FORM.REPEAT_PASSWORD_SELECTOR);
  await rPassword.click();
  await page.keyboard.type(CREDENTIALS.PASSWORD);  const button = await iframe.$(FORM.BUTTON_SELECTOR);
  await button.click();
  
  await page.waitFor(5*1000);
  await browser.close();
  
})();