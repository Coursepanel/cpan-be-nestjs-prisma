import cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

(async () => {
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
    console.log('#slot_view was clicked');
  } catch (error) {}
})();
