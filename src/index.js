

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

// forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
let forecastHTML =`<div class="row">`;
let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
days.forEach(function(day) {
  forecastHTML =  forecastHTML + `

        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img src="http://openweathermap.org/img/wn/10d@2x.png"
          alt=""
          width="60"
          />
          <div class="weather-forecast-temperatures">
          <span class="badge text-bg-danger weather-forecast-temperature max">+18°C</span>  
          <span class="badge text-bg-primary weather-forecast-temperature min">+12°C</span>
        </div>
      </div>
    `;
})

   
forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);
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

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
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

function search(city) {
  let apiKey ="4625c4e0a5b77db6d4e95771e68e2bb6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}



function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9 / 5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event)  {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Kyiv");

displayForecast();

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




