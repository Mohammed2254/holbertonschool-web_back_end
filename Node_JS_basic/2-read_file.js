// Task 2: Create a function countStudents that reads database.csv synchronously

const fs = require('fs');

const countStudents = (path) => {
  try {
    const data = fs.readFileSync(path);
    const lines = data.toString().split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
