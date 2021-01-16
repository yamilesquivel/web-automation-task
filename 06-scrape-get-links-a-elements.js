/*	https://github.com/yamilesquivel
*	https://www.brcline.com/blog/how-to-write-an-excel-file-in-nodejs 
*	=> Guia herramienta para ingresar json a excel con libresia de npm
*/
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-s*+tore.herokuapp.com/')
  await page.click('#login')
  await page.waitForSelector('#n-email')
  await page.type('#n-email', 'user@example.com')
  await browser.close()
})()

