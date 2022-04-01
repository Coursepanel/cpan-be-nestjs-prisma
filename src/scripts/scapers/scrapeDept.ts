import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import { load, Node } from 'cheerio';
import mongoose from 'mongoose';

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