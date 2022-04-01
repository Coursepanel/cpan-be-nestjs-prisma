import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import { load, Node } from 'cheerio';
import mongoose from 'mongoose';

const url = 'https://academic.iitm.ac.in/load_record.php';

const scrapeCourse = async () => {
  const text = fs.readFileSync(
    path.resolve(__dirname, 'course_codes.txt'),
    'utf-8',
  );
  const textByLine = text.split('\n');
  let errorCounter = 0;
  const connection = await mongoose.connect(
    'mongodb://localhost:27017/coursemap-db',
  );
  console.log(connection);
  if (!connection) return;
  const Schema = mongoose.Schema;
  const courseSchema = new Schema({
    courseCode: String,
    name: String,
    description: String,
    textBooks: String,
    referenceBooks: String,
    prerequisites: [String],
  });
  const Course = mongoose.model('Course', courseSchema);
  for (let i = 0; i < textByLine.length; i++) {
    const courseCode = textByLine[i];
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
      const $ = load(res.data);
      const name = $('h4:nth-of-type(1)').text();
      //TODO : add type safety
      const description = ($('h5 p:nth-of-type(1)').children()['0'].next as any)
        ?.data;
      const courseContent = (
        $('h5 p:nth-of-type(2)').children()['0'].next as any
      )?.data;
      const textBooks = (
        $('h5 p:nth-of-type(3)').children()['0'].next as any
      )?.data.split('\n');
      const referenceBooks = (
        $('h5 p:nth-of-type(4)').children()['0'].next as any
      )?.data.split('\n');
      const prerequisites = (
        $('h5 p:nth-of-type(5)').children()['0'].next as any
      )?.data.split(',');
      const course = new Course({
        courseCode,
        name,
        description,
        courseContent,
        textBooks,
        referenceBooks,
        prerequisites,
      });
      await course.save();
      console.log(courseCode, i);
    } catch (error) {
      console.log('invalid row', errorCounter++, i, courseCode);
    }
  }
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
