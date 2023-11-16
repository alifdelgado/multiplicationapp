import fs from 'fs';
import { yarg } from './plugins/args.plugin';
import path from 'path';

let output = '';
const { b: base, l: limit, s: show } = yarg;
const filePath = './src/output';
const tableName = `table-${base}.txt`;

output += `===============================
    Multiplication Table of ${base}
===============================\n`;
for (let i = 1; i <= limit; i++) {
  output += `${base} x ${i} = ${base * i}\n`;
}

try {
  if (show) {
    console.log(output);
  }
  fs.mkdirSync(filePath, { recursive: true });
  fs.writeFileSync(
    path.join(filePath, tableName),
    output,
  );
  console.log('File created');
} catch (err) {
  console.log(err);
}
