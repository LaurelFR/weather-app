function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

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
  if (toFahrenheit.classList.contains("active")) {
    toFahrenheit.classList.remove("active");
    toCelcius.classList.add("active");
  }
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
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
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

let temperatureElement = document.querySelector("#current-temp");
console.log(temperatureElement.innerHTML);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  if (toCelcius.classList.contains("active")) {
    let currentTemperature = Number(temperatureElement.innerHTML);
    let fahrenheitTemperature = (currentTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

    toFahrenheit.classList.add("active");
    toCelcius.classList.remove("active");
  }
}
function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  if (toFahrenheit.classList.contains("active")) {
    let currentTemperature = Number(temperatureElement.innerHTML);
    let celciusTemperature = ((currentTemperature - 32) * 5) / 9;
    temperatureElement.innerHTML = Math.round(celciusTemperature);

    toFahrenheit.classList.remove("active");
    toCelcius.classList.add("active");
  }
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", convertToFahrenheit);
let toCelcius = document.querySelector("#celcius");
toCelcius.addEventListener("click", convertToCelcius);

search("New York");
