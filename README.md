# classroom-finder
A NodeJs Web Scraper to find my classroom inside my school's website

I used Puppeteer (https://github.com/GoogleChrome/puppeteer) to : 

1 - Run headless Chromium and acess my school's website url; <br />
2 - Log me in through my credentials; <br />
3 - Fetch the content from the webpage. <br />

Then i get the text content from the element containing the classroom info

And after all, i use Nodemailer to send myself an e-mail with the data found.

😀
