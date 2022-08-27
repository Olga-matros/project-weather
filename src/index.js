

















// My Location Button Function



// Show actual date

function formatDate(timestamp) {
  let dateToFormat = new Date(timestamp);

  let minutes = dateToFormat.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = dateToFormat.getHours();
  let date = dateToFormat.getDate();
  let year = dateToFormat.getFullYear();

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[dateToFormat.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[dateToFormat.getMonth()];
  return `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`
}

// Show temperature

function showTemperature(response) {

  console.log(response.data);

  
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  sunriseElement.innerHTML = convertUnixToFormattedDate(response.data.sys.sunrise);
  sunsetElement.innerHTML = convertUnixToFormattedDate(response.data.sys.sunset);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
  iconElement.setAttribute("alt", response.data.weather[0].description); 
 


}

let apiKey ="4625c4e0a5b77db6d4e95771e68e2bb6";
let city = "Lisbon";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(showTemperature);




// Convert the time of sunset and sunrise

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




