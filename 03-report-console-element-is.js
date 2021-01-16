/*
*version : https://github.com/yamilesquivel
*/
const puppeteer =require('puppeteer');
const FORM = {
URL: 'https://www.google.com',
IMG:'#hplogo'
};


(async () => { 

   const browser = await puppeteer.launch(FORM.URL);
   const page = await browser.newPage();
   await page.goto(FORM.URL);

    const result = await page.evaluate(() => {
    const links = []
    document.querySelectorAll('div > span >  a')
            .forEach((book) => links.push(links.getAttribute('alt')))
    return links
  })
  
  await page.close();
  await browser.close();
  return result;
	})();

  console.info(result);

const termina = () => { return "Program Finish ✔" };


module.exports = termina ;

			
