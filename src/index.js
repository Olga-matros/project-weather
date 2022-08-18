// Show actual date

let now = new Date();
let h2 = document.querySelector("h2");

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
let date = now.getDate();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h2.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}, ${year}`;

function showTemperatureFahrenheit(event) {
  event.preventDefault();
  let bodyTemperature = document.querySelector(".body-temperature");
  bodyTemperature.innerHTML = formulaFahrenheit;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showTemperatureFahrenheit);

let formulaFahrenheit = (17 * 9) / 5 + 32;

function showTemperatureFahrenheit1(event) {
  event.preventDefault();
  let bodyTemperature1 = document.querySelector(".body-temperature1");
  bodyTemperature1.innerHTML = formulaFahrenheit1;
}

let fahrenheit1 = document.querySelector("#fahrenheit1-link");
fahrenheit1.addEventListener("click", showTemperatureFahrenheit1);

let formulaFahrenheit1 = (17 * 9) / 5 + 32;

function showTemperatureCelcius(event) {
  event.preventDefault();
  let bodyTemperature = document.querySelector(".body-temperature");
  let formulaCelcius = ((formulaFahrenheit - 32) * 5) / 9;
  bodyTemperature.innerHTML = formulaCelcius;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showTemperatureCelcius);

function showTemperatureCelcius1(event) {
  event.preventDefault();
  let bodyTemperature1 = document.querySelector(".body-temperature1");
  let formulaCelcius1 = ((formulaFahrenheit1 - 32) * 5) / 9;
  bodyTemperature1.innerHTML = formulaCelcius1;
}
let celsius1 = document.querySelector("#celsius1-link");
celsius1.addEventListener("click", showTemperatureCelcius1);

// My Location Button Function

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5796366da8b0eaaaecd41b58c7a56fa1`;
  axios.get(apiUrlTemp).then(showTemperature);
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#actual-temp");
    currentTemp.innerHTML = `${temperature}`;
    let currentCity = response.data.name;
    let displayedCurrentCity = document.querySelector("#city");
    displayedCurrentCity.innerHTML = `${currentCity}`;
  }
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);

let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=5796366da8b0eaaaecd41b58c7a56fa1";

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let displayedCity = document.querySelector("#city");
  displayedCity.innerHTML = `${searchInput.value}`;
  let apiURLSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=5796366da8b0eaaaecd41b58c7a56fa1`;
  axios.get(apiURLSearch).then(showSearchTemp);
  function showSearchTemp(response) {
    let searchTemperature = Math.round(response.data.main.temp);
    let displayedSearchTemp = document.querySelector("#actual-temp");
    displayedSearchTemp.innerHTML = `${searchTemperature}`;
    let windStrength = Math.round(response.data.wind.speed);
    let displayedWindStrength = document.querySelector("#wind-speed");
    displayedWindStrength.innerHTML = `${windStrength}`;
    let humidity = Math.round(response.data.main.humidity);
    let displayedHumidity = document.querySelector("#humidity-number");
    displayedHumidity.innerHTML = `${humidity}`;
  }
}
