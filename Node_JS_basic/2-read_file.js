// you should try to read the database file synchronously.
// If the database is not available, it should return an error message.
// You must record the number of students in each field and list.

const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const [, ...students] = lines;
    const fieldCounts = {};

    students.forEach((student) => {
      const [, , , field] = student.split(',');

      if (fieldCounts[field]) {
        fieldCounts[field].push(student.split(',')[0]);
      } else {
        fieldCounts[field] = [student.split(',')[0]];
      }
    });

    console.log(`Number of students: ${students.length}`);
    for (const field in fieldCounts) {
      if (fieldCounts) {
        console.log(
          `Number of students in ${field}: ${
            fieldCounts[field].length
          }. List: ${fieldCounts[field].join(',')}`
        );
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
