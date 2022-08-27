import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import { load } from 'cheerio';
import mongoose from 'mongoose';

const url = 'https://academic.iitm.ac.in/load_record.php';

const cleanMongo = async () => {
  const connection = await mongoose.connect(
    // process.env.MONGO_CONNECTION_STRING,
    'mongodb+srv://coursemapper:anA56sz3*CM100@varaipatam.2g6bq.mongodb.net/coursemap-db?retryWrites=true&w=majority',
    // 'mongodb://localhost:27017/coursemap-db',
  );
  console.log(connection);
  if (!connection) return;
  const Schema = mongoose.Schema;
  //TODO : add type safety
  const courseSchema = new Schema({
    courseCode: String,
    name: String,
    credits: Number,
    deptCode: String,
    courseContent: [String],
    description: String,
    courseType: String,
    textBooks: [String],
    referenceBooks: [String],
    prerequisites: [String],
  });
  const Course = mongoose.model('Course', courseSchema);
  for (let i = 0; 20; i++) {
    try {
      await course.save();
    } catch (error) {
      console.log('invalid row', errorCounter++, i, courseCode, error);
    }
  }
};
cleanMongo();

const processStringToStringArray = (value: string): string[] => {
  return value !== null
    ? value.split('\n').map((elem: string) => {
        if (elem?.length > 0) {
          elem.replace(/\\t/g, '');
          return elem.trim();
        }
      })
    : [];
};

const processValue = (value: string): null | string => {
  if (!value) return null;
  const actualValue: string = value?.toLowerCase();
  if (
    !actualValue ||
    actualValue === 'nil' ||
    actualValue === '-nil-' ||
    actualValue === 'null' ||
    actualValue === 'na' ||
    actualValue === 'n/a' ||
    actualValue === 'none' ||
    actualValue === '---' ||
    actualValue === 'NULL'
  ) {
    return null;
  } else return value;
};

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
