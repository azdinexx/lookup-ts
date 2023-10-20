const fs = require('fs');
const csv = require('csv');

export function TxtTOArray(filename: string): string[] {
  const thefileToCovert = fs.readFileSync(filename, 'utf-8');
  const arr: string[] = thefileToCovert.split('\n');
  return arr;
}
