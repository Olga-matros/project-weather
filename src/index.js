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

// // Show position

// function displayPosition(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;
//   let apiUrlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5796366da8b0eaaaecd41b58c7a56fa1`;
//   axios.get(apiUrlTemp).then(showTemperature);















// My Location Button Function


// Show Temperature

function showTemperature(response) {

  console.log(response);

  
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  sunriseElement.innerHTML = convertUnixToFormattedDate(response.data.sys.sunrise);
  sunsetElement.innerHTML = convertUnixToFormattedDate(response.data.sys.sunset);
 


}

let apiKey ="4625c4e0a5b77db6d4e95771e68e2bb6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=kyiv&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(showTemperature);






function convertUnixToFormattedDate(unix_timestamp) {
  
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  
if (hours < 10) {
  hours = `0${hours}`;
}
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime
}




