const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const credentialsJSON = require('./credentials/credentials.json');
const fs = require('fs');

async function fetch() {
    const browser = await puppeteer.launch();
    console.log('Browser created');

    const page = await browser.newPage();
    await page.goto(credentialsJSON.url, {timeout: 60000});
    console.log(`Navigated to ${credentialsJSON.url}`);

    console.log(`Authenticating`);
    await authenticate(page);

    await page.waitForXPath('//*[@id="mainConteudo"]/div[1]/div/div[2]/div[1]/div/div/div[2]');

    const [classroom] = await page.$x('//*[@id="mainConteudo"]/div[1]/div/div[2]/div[1]/div/div/div[2]');

    const classroomTextContent = await classroom.getProperty('textContent');

    let classroomText = await classroomTextContent.jsonValue();
    
    classroomText = classroomText.split('Visualizar')[0];

    console.log(`Classroom for today: ${classroomText}`);
    
    console.log(`Sending E-mail`);
    await sendMail(classroomText);

    await browser.close();
}

async function authenticate(page) {
    const [usernameInput] = await page.$x('//*[@id="mainConteudo"]/div/div/form/div/div/div[3]/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/input');
    const [passwordInput] = await page.$x('//*[@id="senha_ls"]');
    const [submitInput] = await page.$x('//*[@id="mainConteudo"]/div/div/form/div/div/div[3]/div/table/tbody/tr/td[2]/table/tbody/tr[5]/td/input');

    await usernameInput.type(credentialsJSON.username)
    await passwordInput.type(credentialsJSON.password);

    await submitInput.click();
}


async function sendMail(classroom) {
    let transporter = nodemailer.createTransport({
        host: credentialsJSON.email_host,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: credentialsJSON.email_user,
            pass: credentialsJSON.email_password
        }
    });

    const date = new Date();

    await getTemplateContent('./template.html', async template => {
        let formattedDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

        let info = await transporter.sendMail({
            from: credentialsJSON.name + ' <' + credentialsJSON.email_user + '>',
            to: credentialsJSON.email_user,
            subject: `Classroom Finder | ${formattedDate}`,
            html: template.replace('$$_TITLE_$$', classroom).replace('$$_DATE_$$', formattedDate)
        });
    
        console.log('Message sent: %s', info.messageId);
    });
}

async function getTemplateContent(template, callback) {
    await fs.readFile(template, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return false;
        }
        
        callback(data);
    });
}

module.exports = fetch;