import fs from 'fs';

export default function readDatabase(path) {
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

      resolve(fields);
    });
  });
}
