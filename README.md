# classroom-finder
A NodeJs Script to find my classroom inside my school's website

I used Puppeteer (https://github.com/GoogleChrome/puppeteer) to : 

1 - Run headless Chromium and acess my school's website url; <br />
2 - Log me in through my credentials; <br />
3 - Fetch the content from the webpage. <br />

Then i find the HTML element with the classroom info and strip the tags and classes.

And after all, i use Nodemailer to send myself an e-mail with the data found.

![Screenshot_1](https://user-images.githubusercontent.com/54127618/64754556-2b9cf880-d4fe-11e9-939c-3ae18d839af1.png)

😀
