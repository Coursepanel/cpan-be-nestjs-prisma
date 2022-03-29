import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'fast-csv';

const rows: any = [];

fs.createReadStream(path.resolve(__dirname, 'courses_db.csv'))
  .pipe(parse({ headers: true }))
  .on('error', (error) => console.error(error))
  .on('data', (row) => {
    console.log(row);
    //each row can be written to db
    rows.push(row);
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
});
