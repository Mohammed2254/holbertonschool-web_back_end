// Task 5: Create a small HTTP server using Node's native http module

const fs = require('fs');
const http = require('http');

const DATABASE_PATH = process.argv[2];

const readDatabaseFile = () => {
  try {
    const data = fs.readFileSync(DATABASE_PATH);
    const lines = data.toString().split('\n').filter((line) => line.trim() !== '');
    return lines.slice(1).map((line) => line.split(','));
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    let responseText = 'This is the list of our students\n';
    try {
      const students = readDatabaseFile();

      const fieldMap = {};
      for (const student of students) {
        const [firstname, , , field] = student;
        if (!fieldMap[field]) {
          fieldMap[field] = [];
        }
        fieldMap[field].push(firstname);
      }

      responseText += `Number of students: ${students.length}\n`;

      const fields = Object.keys(fieldMap)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      for (const field of fields) {
        responseText += `Number of students in ${field}: ${fieldMap[field].length}. List: ${fieldMap[field].join(', ')}\n`;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(responseText.trim());
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      responseText += error.message;
      res.end(responseText);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;