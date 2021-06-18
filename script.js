const puppy = require('puppeteer');
const id = 'mojigir233@0pppp.com';
const password = 'Hello123!';

async function login() {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    })
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto('https://www.hackerrank.com/auth/login');
    await tab.type('#input-1', id);
    await tab.type('#input-2', password);
    await tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button');
    await tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled');
    await tab.click('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled');
    await tab.waitForSelector('a[data-attr1="warmup"]');
    await tab.click('a[data-attr1="warmup"]');
    await tab.waitForSelector('.js-track-click.challenge-list-item', { visible: true });
    let problems = await tab.$$('.js-track-click.challenge-list-item');
    problemURL = [];
    for (let i = 0; i < problems.length; i++) {
        let url = await tab.evaluate(function (ele) {
            return ele.getAttribute('href');
        }, problems[i]);
        problemURL.push(url);
    }
    for (let i = 0; i < problemURL.length; i++) {
        await VisitUrl('https://www.hackerrank.com' + problemURL[i], tab);
    }
   browser.close();
}
async function VisitUrl(link, tab) {
    let editorialurl = link.replace('?', '/editorial?');
    let problemurl = link.replace('?', '/problem?');
    await tab.goto(editorialurl);
    await tab.waitForSelector('.editorial-code-box h3');
    let headers = await tab.$$('.editorial-code-box h3');
    await tab.waitForSelector('.highlight pre');
    let codes = await tab.$$('.highlight pre');
    for (let j = 0; j < headers.length; j++) {
        let heading = await tab.evaluate(function (ele) {
            return ele.textContent;
        }, headers[j])
        if (heading == 'C++') {
            let code = await tab.evaluate(function (ele) {
                return ele.textContent;//can also use .innerText;
            }, codes[j])
            await tab.goto(problemurl);
            await tab.waitForSelector('.checkbox-input');
            await tab.click('.checkbox-input');
            await tab.type('#input-1',code);
            await tab.keyboard.down('Control');
            await tab.keyboard.press('A');
            await tab.keyboard.press('X');
            await tab.click('.monaco-scrollable-element.editor-scrollable.vs');
            await tab.keyboard.press('A');
            await tab.keyboard.press('v');
            await tab.keyboard.up('Control');
            await tab.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
            await tab.waitForSelector('.congrats-heading',{visible:true});
            return;
        }
    }
}
login();




//Below is a function which helps you create challenges on hackerrank automatically and also add modesrators to it.


// async function login2() {
//     let browser = await puppy.launch({
//         headless: false,
//         defaultViewport: false
//     })
//     let tabs = await browser.pages();
//     let tab = tabs[0];
//     await tab.goto('https://www.hackerrank.com/auth/login');
//     await tab.type('#input-1', id);
//     await tab.type('#input-2', password);
//     await tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button');
//     await tab.waitForNavigation({ waitUntil: 'networkidle2' });
//     //  await tab.waitForSelector('.ui-icon-chevron-down.down-icon');
//     await tab.click('.ui-icon-chevron-down.down-icon');
//     //await tab.click('.ui-icon-chevron-down.down-icon');
//     await tab.waitForSelector('.dropdown-body.dropdown-menu');
//     await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]');
//     await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
//     await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li a');
//     let links = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li a');
//     let link = await tab.evaluate(function (ele) {
//         return ele.getAttribute('href')
//     }, links[1]);
//     for (let i = 0; i < 5; i++) {
//         await CC('https://www.hackerrank.com' + link, tab);
//     }
// }
// let k = 45;
// let modArr = ['Random', 'saikoushik79', 'Ricky', 'wangAlpha', 'rakeshkreddy123', 'marco12380', 'samgabriel449120', 'kellysilvap', 'anant826001', 'bhaveshkumar_j']
// async function CC(link, tab) {
//     k++;
//     await tab.goto(link);
//     await tab.waitForSelector('.btn.btn-green.backbone.pull-right');
//     await tab.click('.btn.btn-green.backbone.pull-right');
//     await tab.waitForSelector('#name');
//     await tab.click('#name');
//     await tab.type('#name', 'ProblemName' + k);
//     await tab.waitForSelector('#preview');
//     await tab.click('#preview');
//     await tab.type('#preview', 'Description of Problem num' + k);
//     await tab.waitForSelector('#problem_statement-container');
//     await tab.click('#problem_statement-container');
//     await tab.type('#problem_statement-container', 'Problem statement of' + k);
//     await tab.waitForSelector('#input_format-container');
//     await tab.click('#input_format-container');
//     await tab.type('#input_format-container', 'Input format of Problem' + k);
//     await tab.waitForSelector('#constraints-container');
//     await tab.click('#constraints-container');
//     await tab.type('#constraints-container', 'Constraints of Problem' + k);
//     await tab.waitForSelector('#output_format-container');
//     await tab.click('#output_format-container');
//     await tab.type('#output_format-container', 'Output format of Problem' + k);
//     await tab.waitForSelector('#tags_addTag');
//     await tab.click('#tags_addTag');
//     await tab.type('#tags_addTag', 'Tag Of Problem' + k);
//     await tab.keyboard.press('Enter');
//     await tab.waitForSelector('.save-challenge.btn.btn-green');
//     await tab.click('.save-challenge.btn.btn-green');
//     await tab.waitForSelector('li[data-tab="moderators"]', { visible: true });
//     await tab.waitForTimeout(1000);
//     await tab.click("li[data-tab='moderators']");
//     await tab.waitForSelector('#moderator');
//     await tab.click('#moderator');
//     for (let i = 0; i < 10; i++) {
//         await tab.type('#moderator', modArr[i]);
//         await tab.keyboard.press('Enter');
//         //await tab.waitForSelector('.btn.moderator-save');
//         //await tab.click('.btn.moderator-save');
//     }
//     await tab.waitForSelector('.save-challenge.btn.btn-green');
//     await tab.click('.save-challenge.btn.btn-green');
//     return;
// }
// login2();