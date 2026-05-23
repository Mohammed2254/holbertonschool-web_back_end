const express = require('express');

const app = express();

app.listen(1245, () => {
  console.log('http://localhost:1245');
});

app.get('/', (req, res) => {
  res.status(200).send('Hello Holberton School!');
});

module.exports = app;