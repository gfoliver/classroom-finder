# classroom-finder

A NodeJs Web Scraper to find my classroom inside my school's website

## How it works

1. I used Puppeteer (https://github.com/GoogleChrome/puppeteer) to : 

  1.1. Run headless Chromium and acess my school's website url; <br />
  1.2. Log me in through my credentials; <br />
  1.3. Fetch the content from the webpage. <br />

2. Then i get the text content from the element containing the classroom info

3. And after all, i use Nodemailer to send myself an e-mail with the data found.

## Latest Feature

* Added cron functionality with node-cron

## Built With

* [NodeJS](https://nodejs.org/en/)
* [Puppeteer](https://github.com/GoogleChrome/puppeteer)
* [node-cron](https://www.npmjs.com/package/node-cron)

## Authors

* Guilherme Fleck Oliveira
