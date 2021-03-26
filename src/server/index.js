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
const { response } = require('express');
app.use(cors());

// Initialize app
app.use(express.static('dist'));

// Designate listening port for incoming requests
app.listen(8082, function () {
  console.log('Travel App listening on port 8082!')
});

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
});

app.post('/geo', function (req, res) {
  const baseURL = 'http://api.geonames.org/postalCodeLookupJSON?placename=';
  const apiKey = process.env.API_KEY;
  console.log(`Your API Key is ${apiKey}`);
  const cityName = req.body.cityName;

  const params = `${cityName}&maxRows=1&${apiKey}`;
  const getLocation = baseURL + params;

  fetch(getLocation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON',
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log("Response from GeoNames (server-side)", data);
    res.send({
      latitude: data.lat,
      longitude: data.lng,
      country: data.countryCode
    })
  });
})

