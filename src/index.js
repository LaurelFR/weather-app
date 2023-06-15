/*
function formatDate() {
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

function showWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");

  let celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  search(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

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
