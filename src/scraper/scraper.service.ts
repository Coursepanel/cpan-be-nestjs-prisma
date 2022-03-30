import axios from 'axios';
import * as FormData from 'form-data';

import { Injectable } from '@nestjs/common';
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
