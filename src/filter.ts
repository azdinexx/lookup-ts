const createObjectCsvWriter = require('csv-writer').createObjectCsvWriter;

const fs = require('fs');

// globals
const filename = './data/output_finale.csv';
const csvHeader = [
  { id: 'domain', title: 'Domain' },
  { id: 'admin_name', title: 'Admin_Name' },
  { id: 'admin_mail', title: 'Admin_Email' },
  { id: 'admin_phone', title: 'Admin_Phone' },
  { id: 'tech_name', title: 'Tech_Name' },
  { id: 'tech_mail', title: 'Tech_Email' },
  { id: 'tech_phone', title: 'Tech_Phone' },
];

const c = {
  domain: 0,
  admin_name: 1,
  admin_mail: 2,
  admin_phone: 3,
  tech_name: 4,
  tech_mail: 5,
  tech_phone: 6,
};

function filter(filename) {
  const file_input = fs.readFileSync(filename, 'utf-8');
  const file_strings = file_input.split('\n');
  const cleaned = [];

  file_strings.map((line, index) => {
    if (index === 0) return;
    const cells = line.split(',');
    if (
      cells[c.admin_name] === 'RIADI AMINE' ||
      !cells[c.admin_mail] ||
      !cells[c.admin_name]
    )
      return;
    cleaned.push({
      domain: cells[c.domain],
      admin_name: cells[c.admin_name],
      admin_mail: cells[c.admin_mail],
      admin_phone: cells[c.admin_phone],
      tech_name: cells[c.tech_name],
      tech_mail: cells[c.tech_mail],
      tech_phone: cells[c.tech_phone],
    });
  });

  write('./data/filtered.csv', cleaned);
}

function write(filename, data) {
  const csvWriter = createObjectCsvWriter({
    path: filename, // Output file name
    header: csvHeader,
  });
  csvWriter
    .writeRecords(data)
    .then(() => console.log('CSV file written successfully'));
}

filter(filename);
