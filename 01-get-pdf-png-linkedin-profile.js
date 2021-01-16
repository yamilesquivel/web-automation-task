/*
*version : https://github.com/yamilesquivel
*/
const puppeteer = require('puppeteer');
const FORM = {
    USERNAME_SELECTOR: '#username',
    PASSWORD_SELECTOR: '#password',
    BUTTON_SELECTOR: '.btn__primary--large.from__button--floating',
    PROFILE_SELECTOR: '[data-control-name="identity_profile_photo"]'
};

const CREDENTIALS = {
    USERNAME: '<username>',
    PASSWORD: '<password>'
};

(async () => {
  //ir a la pagina
  const browser = await puppeteer.launch({headless :true}); 
  const page = await browser.newPage();  await page.goto('https://www.linkedin.com/login?trk=guest_homepage-basic_nav-header-signin', {waitUntil: 'networkidle0'});  
  //ingresar usuario y contraseña
  await page.click(FORM.USERNAME_SELECTOR);
  await page.keyboard.type(CREDENTIALS.USERNAME);  
  await page.click(FORM.PASSWORD_SELECTOR);
  await page.keyboard.type(CREDENTIALS.PASSWORD);  
 //clickear boton submit
  await page.click(FORM.BUTTON_SELECTOR); 

  await page.waitForNavigation();  
  //ir hacia la pagina de perfil principal
  await page.click(FORM.PROFILE_SELECTOR);
  await page.waitForNavigation(); 

// Start - Advanced filtering
  await autoScroll(page);
  await removeUnnecessaryDom(page);
  await handleShowSeeMore(page);
  await page.waitFor(3*1000);
  await handleShowSeeMore(page);
  await hideSeeLessAndIcon(page);

  //generar el pdf  
  await page.pdf({path: 'resume2.pdf', format: 'A4'});
  await page.screenshot({path: 'resume.png', fullPage: true});  
  
  //cerrar el navegador
  await browser.close();
})();



async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

async function handleShowSeeMore(page) {
    await page.evaluate(() => {
        const seeMoreSelectors = [
            '.pv-profile-section__see-more-inline.pv-profile-section__text-truncate-toggle.link',
            '.lt-line-clamp__more',
            '.pv-profile-section__card-action-bar.pv-skills-section__additional-skills'
        ];
        seeMoreSelectors.forEach(seeMoreSelector => {
            const seeMoreSelectorDoms = document.querySelectorAll(seeMoreSelector);
            seeMoreSelectorDoms.forEach(seeMoreSelectorDom => {
                if (!seeMoreSelectorDom.classList.contains('ember-view')) {
                    seeMoreSelectorDom.click();
                }
            });
        });
    })
}

async function hideSeeLessAndIcon (page) {
    await page.evaluate(() => {
        const seeLessAndIconSelectors = [
            '.lt-line-clamp__less',
            '.pv-profile-section__see-less-inline'
        ];
        seeLessAndIconSelectors.forEach(seeLessAndIconSelector => {
            const seeLessAndIconSelectorDoms = document.querySelectorAll(seeLessAndIconSelector);
            seeLessAndIconSelectorDoms.forEach(seeLessAndIconSelectorDom => {
                seeLessAndIconSelectorDom.style.display = 'none';
            });
        });
    })
}
async function removeUnnecessaryDom(page) {
    await page.evaluate(() => { 
        // Hide all unnecessary contents
        const selectors = [
            '.pv-content__right-rail',
            '.pv-profile-sticky-header',
            '.pv-dashboard-section',
            '.pv-recent-activity-section-v2',
            'footer',
            'header#extended-nav',
            '.pv-top-card-v2-section__actions',
            'li-icon',
            '.pv-skills-section__add-text',
            'button[data-control-name="view_hub"]',
            'a[data-control-name="view_interest_details"]',
            '.pv-profile-section__card-action-bar.pv-skills-section__additional-skills',
            '.ad-banner-container',
            '.pv-top-card-v2-section__link--contact-info',
            '.pv-top-card-v2-section__link--connections',
            'a[data-control-name="edit_position"]',
            'artdeco-tablist',
            '.pv-recommendations-section__pending-rec',
            '.pv-recommendations-section__rec-action-secondary',
            '#msg-overlay'
        ];
        selectors.forEach(selector => {
            let selectorDoms = document.querySelectorAll(selector);
            selectorDoms.forEach(selectorDom => {
                selectorDom.style.display = 'none';
                selectorDom.innerHTML = '';
                selectorDom.className = '';
                selectorDom.id = '';
                selectorDom.opacity = 0;
            })
        })

        // Make main content full width
        let mainContainer = document.querySelector('.core-rail');
        mainContainer.style.width = '100%';
      })
}