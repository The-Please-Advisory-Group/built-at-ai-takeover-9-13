import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
const url = 'https://www.ascendtms.com';
dotenv.config();


export async function getAscendTMSLoadInfo(loadID) {
    try {
        //const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: "new"});
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/usr/bin/google-chrome',
       })
    
        const page = await browser.newPage()
        await page.goto(url)
    
        await page.$eval('#username', el => el.value = process.env.ASCEND_USERNAME);
        await page.$eval('#password', el => el.value = process.env.ASCEND_PASSWORD);
    
        await page.click('#btnLogIn');
        await page.waitForNavigation();
        //wait for selector of an a tag with href of /loads
        await page.waitForSelector('a[href="/loads"]');
        await page.click('a[href="/loads"]');
    
    
        await page.goto("https://www.ascendtms.com/loads");
    
        await new Promise(r => setTimeout(r, 5000));

        //click button that is an a tag with class of lnkEditLoad that has inner html content of "2"
        await page.waitForSelector('a.lnkEditLoad');

        // pass loadID into anonymous function for page.evaluate
        
        await page.evaluate((loadID) => {
            [...document.querySelectorAll('a.lnkEditLoad')].find(element => element.textContent === `${loadID}`).click();
        }, loadID);
    
        await new Promise(r => setTimeout(r, 4000));
    
        // save picture
        //await page.screenshot({path: 'example.png'});
        const sessionStorage = await page.evaluate(() =>  Object.assign({}, window.sessionStorage));
        const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
        return sessionStorage.load;
    
        
    
        await browser.close()
    } catch (error) {
        console.error(error)
    }
}



export async function updateLoadWeight(input) {
    let parsedInput = JSON.parse(input);
    let loadID = parsedInput.loadID;
    let updateToWeight = parsedInput.weight;

    try {
        //const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: "new"});
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/usr/bin/google-chrome',
       })
    
        const page = await browser.newPage()
        await page.goto(url)
    
        await page.$eval('#username', el => el.value = process.env.ASCEND_USERNAME);
        await page.$eval('#password', el => el.value = process.env.ASCEND_PASSWORD);
    
        await page.click('#btnLogIn');
        await page.waitForNavigation();
        //wait for selector of an a tag with href of /loads
        await page.waitForSelector('a[href="/loads"]');
        await page.click('a[href="/loads"]');
    
    
        await page.goto("https://www.ascendtms.com/loads");
    
        await new Promise(r => setTimeout(r, 5000));

        //click button that is an a tag with class of lnkEditLoad that has inner html content of "2"
        await page.waitForSelector('a.lnkEditLoad');

        // pass loadID into anonymous function for page.evaluate
        
        await page.evaluate((loadID) => {
            [...document.querySelectorAll('a.lnkEditLoad')].find(element => element.textContent === `${loadID}`).click();
        }, loadID);
    
        await new Promise(r => setTimeout(r, 4000));

        await page.waitForSelector('#weight');
        await page.$eval('#weight', (el, updateToWeight) => {el.value = updateToWeight;}, updateToWeight);
        //press enter key on #weight
        page.$('#weight').then(el => el.press('Enter'));
    
        //puppeteer evalute js on page
        // await page.evaluate((updateToWeight) => { 
        //     let load = JSON.parse(window.sessionStorage.getItem("load"));
        //     load.weight = updateToWeight;
        //     window.sessionStorage.setItem("load", JSON.stringify(load));
        // }, updateToWeight);
        await new Promise(r => setTimeout(r, 2000));

        const sessionStorage = await page.evaluate(() =>  Object.assign({}, window.sessionStorage));

        console.log(sessionStorage.load);

        
        
        //btnExit
        await page.$eval('#btnExit', (el) => {el.click()});

        await new Promise(r => setTimeout(r, 30000));
    
        await browser.close()
    } catch (error) {
        console.error(error)
    }
}