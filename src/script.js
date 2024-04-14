let now = new Date();
let day = document.querySelector("#day-name");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day.innerHTML = days[now.getDay()];

let time = document.querySelector("#current-time");
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

time.innerHTML = `${hour}:${minutes}`;

function updateCity(formsearch) {
  formsearch.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  let cityName = document.querySelector("#city-name");
  cityInput.value =
    cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1);
  cityName.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let weatherSearch = document.querySelector("#weather-form");
weatherSearch.addEventListener("submit", updateCity);

function showCurrentTemperature(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector(".current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  if (temperature >= 25) {
    temperatureElement.innerHTML = "🥵 " + temperature + "°C";
  } else if (temperature < 25 && temperature >= 11) {
    temperatureElement.innerHTML = "☀️ " + temperature + "°C";
  } else {
    temperatureElement.innerHTML = "🥶 " + temperature + "°C";
  }
  weatherSearch.reset();
}

function searchCity(city) {
  let apiKey = "8eatdeae3d0b8e63a64512c0d2f3a54o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
