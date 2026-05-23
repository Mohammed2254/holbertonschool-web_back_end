const fs = require('fs');

function countStudents(path) {
  let data;

  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n').filter((line) => line.trim() !== '');
  const students = lines.slice(1);
  const fields = {};

  console.log(`Number of students: ${students.length}`);

  students.forEach((student) => {
    const studentData = student.split(',');
    const firstname = studentData[0];
    const field = studentData[3].trim();

    if (!fields[field]) {
      fields[field] = [];
    }

    fields[field].push(firstname);
  });

  Object.keys(fields).forEach((field) => {
    const number = fields[field].length;
    const list = fields[field].join(', ');

    console.log(`Number of students in ${field}: ${number}. List: ${list}`);
  });
}

module.exports = countStudents;