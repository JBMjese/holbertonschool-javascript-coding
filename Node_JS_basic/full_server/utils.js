import { promises as fs } from 'fs';

export async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const rows = data.split('\n').filter((row) => row.trim());
    const headers = rows.shift().split(',');
    const fieldIndex = headers.indexOf('field');
    const firstNameIndex = headers.indexOf('firstname');
    const students = {};

    rows.forEach((row) => {
      const student = row.split(',');
      const field = student[fieldIndex];
      const firstName = student[firstNameIndex];

      if (!students[field]) {
        students[field] = [];
      }
      students[field].push(firstName);
    });

    return students;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
