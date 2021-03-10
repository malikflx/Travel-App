const dotenv = require('dotenv');
dotenv.config();
// Express to run server and routes
const express = require('express');
/* Dependencies */
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

// Start up instance of app
const app = express();

/* Middleware */
// Configure Express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Enable Cors for browser-server communication without security interruptions (cross origin allowance)
const cors = require('cors');
app.use(cors());

// Initialize app
app.use(express.static('dist'));
app.listen(8081, function () {
  console.log('Travel App listening on port 8081!')
});

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
});