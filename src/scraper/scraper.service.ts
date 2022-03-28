import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
@Injectable()
export class ScraperService {
  async scrapeWeb() {
    console.log(puppeteer);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://academic.iitm.ac.in/course_detail.php');
    try {
      const pageContent = await page.content;
      const $ = cheerio.load(await pageContent());
      const deptDropdown = $('select#department');
      //TODO : add type safety
      const options = Array.from(deptDropdown.children as any).slice(1);
      console.log(options);
      deptDropdown.val((options[0] as HTMLOptionElement).label);
      await page.click('#slot_view');
    } catch (error) {}

    // console.log(someEl)

    // const [el] = await page.$x(
    //   '/html/body/div[1]/div[2]/div[9]/div[4]/div[3]/div[1]/div[1]/div/div/div[2]/div[1]/div[1]/ul/li[1]/span/span/div/img',
    // );
    // const src = await el.getProperty('src');
    // const imgURL = await src.jsonValue();

    // const [el2] = await page.$x(
    //   '/html/body/div[1]/div[2]/div[9]/div[4]/div[4]/div[1]/div/h1/span',
    // );
    // const txt = await el2.getProperty('textContent');
    // const title = await txt.jsonValue();

    // const [el3] = await page.$x(
    //   '/html/body/div[1]/div[2]/div[9]/div[4]/div[4]/div[10]/div[1]/div/table/tbody/tr[2]/td[2]/span[1]',
    // );
    // const txt2 = await el3.getProperty('textContent');
    // const price = await txt2.jsonValue();

    // console.log({
    //   imgURL,
    //   title,
    //   price,
    // });

    // browser.close();
  }
}
