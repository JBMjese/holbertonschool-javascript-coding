// should attempt to read the database file asynchronously and return a promise.
// If the database is not available, it should throw a message error.
// It should log the number of students in each field, and the list.

const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

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
          console.log(`Number of students in ${field}: ${fieldCounts[field].length}. List: ${fieldCounts[field].join(', ')}`);
        }
      }
      resolve();
    });
  });
}

module.exports = countStudents;
