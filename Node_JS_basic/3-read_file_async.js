// Task 3: Create a function countStudents that reads database.csv asynchronously

const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.toString().split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const students = lines.slice(1).map((line) => line.split(','));

    const fieldMap = {};

    for (const student of students) {
      const [firstname, , , field] = student;
      if (!fieldMap[field]) {
        fieldMap[field] = [];
      }
      fieldMap[field].push(firstname);
    }

    console.log(`Number of students: ${students.length}`);

    const fields = Object.keys(fieldMap)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    for (const field of fields) {
      console.log(`Number of students in ${field}: ${fieldMap[field].length}. List: ${fieldMap[field].join(', ')}`);
    }

    resolve();
  });
});

module.exports = countStudents;
