/*
*version : https://github.com/yamilesquivel
*/
const puppeteer = require('puppeteer');
console.info("**Este script muestra una accion basica de navegacion** \n ");
(async()=>{
	console.info("Ingrese la URL del sitio con formato https://www.<dominio>.com a continuacion");
	//metodo de nodejs
	process.stdin.on('data',function(data){
	let url=data.toString().trim();
	
	//tareas de puppeteer
	const browser = await puppeteer.launch()
  	const page = await browser.newPage()
  	await page.goto(url);
  	await page.waitForNavigation();
  	await browser.close();

  	//metodo de nodejs
	process.stdout.write(`Se ha visitaddo el sitio  ${url} con exito \n pero no se ha conffigurado un reporte`);
	process.exit() ;
	});
})();

