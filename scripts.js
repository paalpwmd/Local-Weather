let userLat;
let userLong;
let userLocation;
let userHumidity;
let userCity;

// Uses built in geolocation feature in HTML5 to get users position.

let getLocation = new Promise ((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
    resolve(console.log("Got position"))
  } else {
    //Returns Error if Geolocation API is not supported by browser 
    let browserLocation = document.getElementById('displaylocation');
    browserLocation.innerHTML = 'Geolocation is not supported by browser'
  }
})

function getWeather(position){

  userLat = position.coords.latitude;
  userLong = position.coords.longitude;

  fetch('https://fcc-weather-api.glitch.me/api/current?lat=' + userLat + '&lon=' +userLong)

  .then((response) => {
    return response.json();
  })
  .then((data) => {
    userLocation = data.name;
    userHumidity = data.main.humidity;
    userTemp = Math.trunc((data.main.temp * 9/5) + 32);
    getCity();
  })
}

function getCity(){

  fetch('https://api.opencagedata.com/geocode/v1/json?key=dda07364042a4b3cbd042c494323cf24&q=' + userLat + '%2C' + userLong + '&pretty=1')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  userCity = data.results[0].components.state;
  myFunction(data);
  })
  }

  let timeLeft = 6;
  function countDown(){
    $('#intro').toggleClass('hidden');
    $('#displaytemp').toggleClass('hidden');
    $('#displayhumidity').toggleClass('hidden');
    setInterval(function(){
      timeLeft--;
      if(timeLeft <= 0){
        window.location.reload();
      } else {
        $('#displaylocation').html(`<p>Error connecting to our servers. Please wait ${timeLeft}s</p>`);
        
    } }, 1000);
  }
  
//fix weird api glitch that defaults to Shuzenji, JP.
function myFunction(data){
  $('#intro').toggleClass('hidden');
  $('#displaytemp').html(`<p>is ${userTemp}°F</p>`);
  if (userLocation == 'Shuzenji'){
    countDown();
  } else {
    $('#displaylocation').html(`<h1>${userLocation}, ${userCity}</h1>`);
  }
  $('#displayhumidity').html(`<p><em>with ${userHumidity}% humidity </em></p>`);
}