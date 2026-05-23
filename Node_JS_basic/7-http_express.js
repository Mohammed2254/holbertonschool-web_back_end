// Task 7: Create a small HTTP server using Express that listens on port 1245,

const express = require('express');
const fs = require('fs');

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

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
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

        let responseText = 'This is the list of our students\n';
        responseText += `Number of students: ${students.length}\n`;

        const fields = Object.keys(fieldMap).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        for (const field of fields) {
            responseText += `Number of students in ${field}: ${fieldMap[field].length}. List: ${fieldMap[field].join(', ')}\n`;
        }

        res.send(responseText.trim());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(1245);

module.exports = app;
