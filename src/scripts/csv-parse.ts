import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'fast-csv';

interface CourseRow {
  dept_code: string;
  course_code: string;
  course_name: string;
  type: string;
  credits: string;
}

const parseCsv = async (rows: CourseRow[]) => {
  const writeStream = fs.createWriteStream(
    path.resolve(__dirname, 'course_codes.txt'),
  );
  fs.createReadStream(path.resolve(__dirname, 'courses_db.csv'))
    .pipe(parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row: CourseRow) => {
      // console.log(row);
      //each row can be written to db
      rows.push(row);
      writeStream.write(row.course_code + '\n');
    })
    .on('end', (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);
      console.log(rows.length);
      return rows.map((row: CourseRow) => row.course_code);
    });
};

(async () => {
  console.log(await parseCsv([]));
})();
