/*
function updateTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDate = new Date();
  let currentDay = days[currentDate.getDay()];
  let currentHour = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();
  let appTime = document.querySelector("#current-time");
  if (currentMinutes >= 10) {
    appTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
  } else {
    appTime.innerHTML =
      appTime.innerHTML = `${currentDay} ${currentHour}:0${currentMinutes}`;
  }
}
updateTime();

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let citySearched = searchInput.value;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = citySearched;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentAppTemperature = document.querySelector(".current-temp");
  if (currentAppTemperature.classList.contains("now-celcius")) {
    let currentTemperature = Number(currentAppTemperature.innerHTML);
    let updatedTemp = Math.round((currentTemperature * 9) / 5 + 32);
    currentAppTemperature.innerHTML = updatedTemp;
    currentAppTemperature.classList.remove("now-celcius");
    currentAppTemperature.classList.add("now-fahrenheit");
    let fahrenheitToggle = document.querySelector("#fahrenheit");
    fahrenheitToggle.classList.add("bold");
    let celciusToggle = document.querySelector("#celcius");
    celciusToggle.classList.remove("bold");
  }
}
function convertToCelcius(event) {
  event.preventDefault();
  let currentAppTemperature = document.querySelector(".current-temp");
  if (currentAppTemperature.classList.contains("now-fahrenheit")) {
    let currentTemperature = Number(currentAppTemperature.innerHTML);
    let updatedTemp = Math.round(((currentTemperature - 32) * 5) / 9);
    currentAppTemperature.innerHTML = updatedTemp;
    currentAppTemperature.classList.remove("now-fahrenheit");
    currentAppTemperature.classList.add("now-celcius");
    let fahrenheitToggle = document.querySelector("#fahrenheit");
    fahrenheitToggle.classList.remove("bold");
    let celciusToggle = document.querySelector("#celcius");
    celciusToggle.classList.add("bold");
  }
}

let toFahrenheit = document.querySelector("#fahrenheit");
let toCelcius = document.querySelector("#celcius");

toFahrenheit.addEventListener("click", convertToFahrenheit);
toCelcius.addEventListener("click", convertToCelcius);
*/
//Homework week 5
function showWeather(response) {
  let currentAppTemperature = document.querySelector("#current-temp");
  currentAppTemperature.innerHTML = Math.round(response.data.main.temp);
}

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let citySearched = searchInput.value;
  let capitalizedCitySearched =
    citySearched.charAt(0).toUpperCase() + citySearched.slice(1);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = capitalizedCitySearched;
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

function showCurrentLocationWeather(response) {
  let currentAppTemperature = document.querySelector("#current-temp");
  currentAppTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentAppCity = document.querySelector("#current-city");
  let currentLocation = response.data.name;
  currentAppCity.innerHTML = currentLocation;
}

function retrievePosition(position) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showCurrentLocationWeather);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentCity);
