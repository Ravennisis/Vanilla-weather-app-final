//update current date and time
function changeTime() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentTime.getDay()];
  return `${day} ${hour}:${minutes}`;
}

let dateTime = document.querySelector("#dateTime");
dateTime.innerHTML = changeTime();

function formatTime(timestamp) {
  let currentTime = new Date(timestamp);
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } 

  return `${hour}:${minutes}`;
}

//display search result
function displayWeather(response) {
  let cityResult = document.querySelector("#city-result");
  let currentCountry = document.querySelector("#country");
  let tempResult = document.querySelector("#temp-display");
  let setIcon = document.querySelector("#search-result-emoji");
  let currentDescription = document.querySelector("#description");
  let feelsLike = document.querySelector("#feels-like");
  let feels = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind-speed");

  celsiusTemp = Math.round(response.data.main.temp);

  cityResult.innerHTML = response.data.name;
  currentCountry.innerHTML = response.data.sys.country;
  tempResult.innerHTML = celsiusTemp;
  setIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentDescription.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = `${feels}°`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}mph`;
}
//display forecast


// city by doing a search
function getWeather(event) {
  event.preventDefault();
  let key = `165c43c43eab3003e85ee5582f850841`;
  let city = document.querySelector("#search-bar").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  //apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${units}`;
  //axios.get(apiUrl).then(displayForecast);
}

let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", getWeather);

//city by doing a current location serach
function getLocalWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocalWeather);

function showPosition(position) {
  let apiKey = `165c43c43eab3003e85ee5582f850841`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  //apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  //axios.get(apiUrl).then(displayForecast);
}

//change from Celcius to Farenheit
let celsiusTemp = null;

function changeFahreneit(event) {
  event.preventDefault();
  let fahreneitLink = document.querySelector("#temp-display");
  fahreneitLink.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahreneitLink.classList.add("active");
}
let fahreneitLink = document.querySelector("#fahrenheit-link");
fahreneitLink.addEventListener("click", changeFahreneit);

function changeCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-display");
  temperatureElement.innerHTML = celsiusTemp;
  celsiusLink.classList.add("active");
  fahreneitLink.classList.remove("active");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeCelsius);

getLocalWeather();