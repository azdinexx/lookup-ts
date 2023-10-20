import { createObjectCsvWriter } from 'csv-writer';
import { loukup } from './utils/lookup';
import { TxtTOArray } from './utils/handlingFiles';
import { DomainInfos } from './types';
import { csvHeader } from './lib/constants';
import { createObjectFromDomainInfo } from './utils/createObjectFromDomainInfo';

const input = TxtTOArray('./src/input.txt');

// Data to be written to the CSV file.
// Create a CSV writer with the specified header and file path.
const csvWriter = createObjectCsvWriter({
  path: './src/output.csv', // Output file name
  header: csvHeader,
});

const input_uniq = [...new Set(input)];
input_uniq.forEach((domain) => {
  loukup(domain, 'whois.iam.net.ma', (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      const obj: DomainInfos = createObjectFromDomainInfo(data);

      if (obj.admin_name === 'REDACTED FOR PRIVACY' || obj.admin_name === '')
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
