import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';

const url = 'https://academic.iitm.ac.in/load_record.php';
const scrapeDept = async () => {
  const form = new FormData();
  form.append('pid', 'course_details');
  form.append('dept_code', 'MS');
  form.append('course', '');
  console.log(form.getHeaders());
  const res = await axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
  console.log(res);
};
// scrapeDept();

const scrapeCourse = async () => {
  const text = fs.readFileSync(
    path.resolve(__dirname, 'course_codes.txt'),
    'utf-8',
  );
  const textByLine = text.split('\n');
  let errorCounter = 0;
  const queriedResponses = textByLine.map(
    async (courseCode: string, i: number) => {
      const form = new FormData();
      form.append('pid', 'CoursesPendingApproval');
      form.append('dept_code', '');
      form.append('course', courseCode);
      try {
        const res = await axios.post(url, form, {
          headers: {
            ...form.getHeaders(),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        return res.data;
      } catch (error) {
        console.log('invalid row', errorCounter++, i, courseCode);
      }
    },
  );
  // console.log(queriedResponses.length);
};
scrapeCourse();

// ? LEGACY APPROACH  - actually hand-scraping each course's details
// const puppeteerScrapeWeb = () => {
//   // const browser = await puppeteer.launch({ headless: false });
//     // const page = await browser.newPage();
//     // await page.goto('https://academic.iitm.ac.in/course_detail.php');
//   try {
//     // const pageContent = await page.content();
//     // const $ = load(pageContent);
//     // //TODO : add type safety
//     // const deptDropdown = $('select#department') as any;
//     // const depts = deptDropdown.children();
//     // Object.keys(depts).map(function (key, index) {
//     //   if (index === 0) {
//     //     depts[key].attribs.selected = '';
//     //   }
//     //   if (index === 1) {
//     //     depts[key].attribs.selected = 'selected';
//     //     deptDropdown.attr('value', depts[key].attribs.value);
//     //     // deptDropdown.attribs.value = depts[key].attribs.value;
//     //   }
//     //   if (depts[key].name !== undefined)
//     //     console.log(
//     //       depts[key].name,
//     //       depts[key].type,
//     //       depts[key].attribs.selected,
//     //       depts[key].attribs.value,
//     //       index,
//     //     );
//     // });
//     // await console.log(deptDropdown.value);
//     // await page.click('#slot_view');
//     // console.log(res);
//   } catch (error) {}
// }
