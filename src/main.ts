const createObjectCsvWriter = require('csv-writer');
const loukup = require('./utils/lookup');
import { TxtTOArray } from './utils/handlingFiles';
import { DomainInfos } from './types';
import { csvHeader } from './lib/constants';
import { createObjectFromDomainInfo } from './utils/createObjectFromDomainInfo';
import { sendWhoisRequest } from './utils/pleasewait';
import { exit } from 'process';

const input = TxtTOArray('./data/input/ca.txt');

// Data to be written to the CSV file.
// Create a CSV writer with the specified header and file path.
const csvWriter = createObjectCsvWriter({
  path: './data/output/ca.csv', // Output file name
  header: csvHeader,
});
let count = 0;
const input_uniq = [...new Set(input)];

if (input_uniq.length === 0) exit();
input_uniq.forEach((domain) => {
  if (domain.split('.').pop() === 'com') {
    sendWhoisRequest(() => {
      loukup(domain, 'whois.cira.ca', (err, data) => {
        count++;
        console.log(count);
        if (err) {
          console.error(err.message);
          return;
        } else {
          console.log(data);
          const obj: DomainInfos = createObjectFromDomainInfo(data);

          if (
            obj.admin_name === 'REDACTED FOR PRIVACY' ||
            obj.admin_name === ''
          )
            return;
          else {
            const csvFile: DomainInfos[] = [];

            csvFile.push(obj);
            console.log(csvFile.length);
            // Write the data to the CSV file.
            csvWriter
              .writeRecords(csvFile)
              .then(() => console.log('CSV file written successfully'))
              .catch((error: any) =>
                console.error('Error writing CSV file:', error)
              );
          }
        }
      });
    });
  }
});
console.log('script end');

console.log(count);
