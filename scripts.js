let request = new XMLHttpRequest();
let data = "";
let userlat = '';
let userLong = '';
let key = 'd92ff65ad9912e2bb717f67fa1000369'
let userTemp = ''


//Uses built in geolocation feature in HTML5 to get users position.
function getLocation() {
  if (navigator.geolocation) {
    let browserlocation = navigator.geolocation;
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //Returns Error if Geolocation API is not supported by browser 
    let browserLocation = document.getElementById('displaytemp');
    browserLocation.innerHTML = 'Geolocation is not supported by browser'
  }
}

//Gets position of user, and assigns longitude and latitude to variables.
//Fetches OpenWeatherAPI using authentication key and user location data
//Returns JSON response
function showPosition(position) {
  userLat = Math.trunc(position.coords.latitude);
  userLong = Math.trunc(position.coords.longitude);
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + userLat +'&lon=' + userLong + '&appid=' + key)  
  .then(function(resp) { 
    return resp.json() 
  }) 

  // Displays the temperature of the user based on their location
  .then(function(data) {

    if (data.main.temp){
      let Temperature = document.getElementById('displaytemp');
      let Humidity = document.getElementById('displayhumidity');
      let userHumidity = data.main.humidity
      userTemp = (data.main.temp - 273.15) * 9/5 + 32
      Temperature.innerHTML = `The temperature at ${userLat}, ${userLong} is ${Math.trunc(userTemp)} degrees Fahrenheit.`;
      Humidity.innerHTML = `The humidity at ${userLat}, ${userLong} is ${userHumidity}%.`;
    }
    else {
      Temperature.innerHTML = 'Unable to get weather! Please try again later';
    }
    
  })

  // switch (userTemp) {
  //   case 0-32:
  //     body.
  // }


// catch any errors
  .catch(function() {
    
  });
}

//Runs scripts on document load
document.onload = getLocation();