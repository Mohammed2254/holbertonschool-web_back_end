const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(Error('Cannot load the database'));

      const lines = data.split('\n').filter((l) => l.trim() !== '');
      const fields = {};

      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        const field = parts[3];
        const firstname = parts[0];

        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      }

      let output = `Number of students: ${lines.length - 1}`;
      for (const field of Object.keys(fields).sort()) {
        output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      }

      resolve(output);
    });
  });
}

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200);
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const db = process.argv[2];

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    try {
      const data = await countStudents(db);
      res.end(data);
    } catch (err) {
      res.end(err.message);
    }
  }
});

app.listen(1245);
module.exports = app;
