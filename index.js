const puppeteer = require('puppeteer');
const readline = require('readline-sync');
const nodemailer = require('nodemailer');
const credentialsJSON = require('./credentials/credentials.json');


var contentArray = undefined;
var classroom = undefined;

(async () => {
    const browser = await puppeteer.launch();
    await console.log('Browser Started');
    const page = await browser.newPage();
    await console.log('New Page Created');
    await page.goto(credentialsJSON.url);
    await console.log('Entered University Website');
    await console.log('Asking Credentials...');
    const credentials = await askCredentials();
    await console.log('Authenticating...');
    await page.type('input[name=login]', credentials.username);
    await page.type('#senha_ls', credentials.password);
    await page.click('.class_btn_login');
    await page.waitForNavigation({waitUntil: "domcontentloaded"});
    await console.log('Succesfully Authenticated');
    await console.log('Fetching content');
    const content = await page.content();
    contentArray = await content.split('div');
    classroom = await fetchContent();
    await console.log('Classroom Found !');
    await beautifyContent();
    await console.log('Classroom = ' + classroom);
    await sendMail();
    await browser.close();
})();

async function askCredentials() {
    let user = readline.question('What is your Username? ');
    let pass = readline.question('What is your Password? ', {hideEchoBack: true});
    return {
        "username": user,
        "password": pass
    }
}

async function fetchContent() {
    for(let i = 0; i < contentArray.length; i++) {
        if (contentArray[i].includes('na sala')) {
            return contentArray[i];
        }
    };
}

async function beautifyContent() {
    classroom = classroom.replace(/(<([^>]+)>)/ig,"");
    classroom = classroom.replace('class="pa_agenda_aulas_in">',"");
    classroom = classroom.replace('</', '');
}

async function sendMail() {
    let transporter = nodemailer.createTransport({
        host: credentialsJSON.email_host,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: credentialsJSON.email_user,
            pass: credentialsJSON.email_password
        }
    });

    let info = await transporter.sendMail({
        from: credentialsJSON.name + ' <' + credentialsJSON.email_user + '>',
        to: credentialsJSON.email_user,
        subject: 'Classroom',
        text: classroom
    });

    console.log('Message sent: %s', info.messageId);
}