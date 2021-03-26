import fetch from 'node-fetch';

function handleSubmit(e) {
  e.preventDefault();
  // check city name entered into form field
  let formCity = document.getElementById('city_input').value;
  console.log('::: Form Submitted :::')
  fetch('http://localhost:8082/geo', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cityName: formCity })
  })
    .then(res => res.json())
    .then(function (res) {
      console.log('response from GeoNames (client-side)', res);
      document.getElementById('latitude').innerHTML = `Latitude: ${res.lat}`;
      document.getElementById('longitude').innerHTML = `Longitude: ${res.lng}`;
      document.getElementById('country').innerHTML = `Country: ${res.countryCode}`;
    })
}

export { handleSubmit }