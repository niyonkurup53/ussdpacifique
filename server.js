// server.js
const express = require('express');
const bodyParser = require('body-parser');
const handleUssd = require('./ussd');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/ussd', handleUssd);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
