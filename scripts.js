let request = new XMLHttpRequest();
let data = "";
let userlat = '';
let userLong = '';
let key = 'd92ff65ad9912e2bb717f67fa1000369'


//create variables for userLat and userLong to append to URL
//call weatherBalloon with userLat and userLong ##AFTER DOCUMENT LOAD AND LOCATION APPROVED#


function getLocation() {
  if (navigator.geolocation) {

    let browserlocation = navigator.geolocation;
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    userLocation = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  userLat = Math.trunc(position.coords.latitude);
  userLong = Math.trunc(position.coords.longitude);
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + userLat +'&lon=' + userLong + '&appid=' + key)  
  .then(function(resp) { 
    return resp.json() 
  }) 

  // Convert data to json
  .then(function(data) {

    if (data.main.temp){
      let Temperature = document.getElementById('displaytemp');
      let userTemp = (data.main.temp - 273.15) * 9/5 + 32
      Temperature.innerHTML = 'The Temperature in Clayton, MO is ' + Math.trunc(userTemp) + ' degrees Fahrenheit';
    }
    else {
      console.log('Unable to get weather! Please try again later')
    }
    
  })

// catch any errors
  .catch(function() {
    
  });
}

//Returns location of user on load
document.onload = getLocation();








