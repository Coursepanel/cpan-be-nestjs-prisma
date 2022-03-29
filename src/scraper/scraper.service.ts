import querystring from 'querystring';
import axios from 'axios';
import { load } from 'cheerio';
import * as puppeteer from 'puppeteer';
import qs from 'qs';
import * as FormData from 'form-data';

import { Injectable } from '@nestjs/common';
import cheerio, { Element, Node } from 'cheerio';
const url = 'https://academic.iitm.ac.in/course_detail.php';
@Injectable()
export class ScraperService {
  async scrapeWeb() {
    const form = new FormData();
    form.append('pid', 'course_details');
    form.append('dept_code', 'MS');
    form.append('course', '');
    const res = await axios.post(url, form, { headers: form.getHeaders() });
    console.log(res, 'res');
  }
}
