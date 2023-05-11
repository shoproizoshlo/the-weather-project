// // In your project, display the current date and time using JavaScript: Tuesday 16:00
// function showSignUpFormValues(event) {
//   let currentDate = new Date();
//   let weekDay = [
//     "Sunday",
//     "Monday",
//     "Tueday",
//     "Wednesday",
//     "Thuday",
//     "Friday",
//     "Satday",
//   ];
//   weekDay = weekDay[currentDate.getDay()];
//   let cityTime = document.querySelector("p#time");
//   if (currentDate.getMinutes() < 10) {
//     let newDate = `${weekDay} ${currentDate.getHours()}:0${currentDate.getMinutes()}`;
//     cityTime.innerHTML = newDate;
//   } else {
//     let newDate = `${weekDay} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
//     cityTime.innerHTML = newDate;
//   }
// }

// // Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
// // it should display the name of the city on the result page and the current temperature of the city.
// let apiKey = "e14a13b38652811a3dc9a8a3e4d551f6";
// function showWeatherData(response) {
//   document.querySelector("#temp-num").innerHTML = `${Math.round(
//     response.data.main.temp
//   )}`;
//   document.querySelector(
//     "#description"
//   ).innerHTML = `${response.data.weather[0].main}`;
//   document.querySelector("#speed").innerHTML = `${Math.round(
//     response.data.wind.speed
//   )}`;
//   document.querySelector(
//     "#humidity"
//   ).innerHTML = `${response.data.main.humidity}`;
// }

// function search(city) {
//   document.querySelector("p#city").innerHTML = city;
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
//   axios.get(apiUrl).then(showWeatherData);
// }

// function handleSubmit() {
//   event.preventDefault();
//   // подумать куда перенести эту функцию
//   let city = document.querySelector("#input-city").value;
//   search(city);
// }

// let searchForm = document.querySelector("#search-form");
// searchForm.addEventListener("submit", handleSubmit);

// // show city by default
// search("Vienna");
// showSignUpFormValues(event);

// // Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and
// // the city and current temperature using the OpenWeather API.

// function currentLocationTemp(response) {
//   document.querySelector("#city").innerHTML = `${response.data.name}`;
//   showWeatherData(response);
// }
// function handlePosition(position) {
//   let positionApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
//   axios.get(positionApiUrl).then(currentLocationTemp);
// }
// function navigatorLocal(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(handlePosition);
// }

// let localButton = document.querySelector("#local-button");
// localButton.addEventListener("click", navigatorLocal);

// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it,
// it should convert the temperature to Fahrenheit.When clicking on Celsius, it should convert it back to Celsius.

// function changeFahrenheit(event) {
//   event.preventDefault();
//   let locationTemperature = document.querySelector("#temp-num");
//   let temperature = locationTemperature.innerHTML;
//   temperature = Number(temperature);
//   locationTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
// }
// let convertFahrenheit = document.querySelector("a#fahrenheit-link");
// convertFahrenheit.addEventListener("click", changeFahrenheit);

// function changeCelsius(event) {
//   event.preventDefault();
//   let locationTemperature = document.querySelector("#temp-num");
//   locationTemperature.innerHTML = "12";
// }
// let convertCelsius = document.querySelector("a#celsius-link");
// convertCelsius.addEventListener("click", changeCelsius);

function search(city) {
  let apiKey = "e14a13b38652811a3dc9a8a3e4d551f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityWeather);
}
search("Vienna");

function cityWeather(response) {
  console.log(response.data);
  let date = formatDate(response.data.dt * 1000);
  let status = response.data.weather[0].main;
  let weatherImg = response.data.weather[0].icon;
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let speed = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#time");
  let statusElement = document.querySelector("#description");
  let weatherImgElement = document.querySelector("#weather-img");
  let tempElement = document.querySelector("#temp-num");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");

  celsiousTemp = response.data.main.temp;

  dateElement.innerHTML = `${date}`;
  statusElement.innerHTML = `${status}`;
  weatherImgElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherImg}@2x.png`
  );
  weatherImgElement.setAttribute("alt", response.data.weather[0].main);
  tempElement.innerHTML = `${temp}`;
  humidityElement.innerHTML = `${humidity}`;
  speedElement.innerHTML = `${speed}`;
}
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
  return `${day} ${hours}:${minutes}`;
}

function formSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  search(inputCity.value);
  let h1 = document.querySelector("#city");
  h1.innerHTML = inputCity.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", formSubmit);

function showFarenheit(event) {
  event.preventDefault();
  celsiousLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemp = Math.round((celsiousTemp * 9) / 5 + 32);
  let tempElement = document.querySelector("#temp-num");
  tempElement.innerHTML = farenheitTemp;
}
let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", showFarenheit);

let celsiousTemp = null;

function showCelsious(event) {
  event.preventDefault();
  celsiousLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp-num");
  tempElement.innerHTML = Math.round(celsiousTemp);
}

let celsiousLink = document.querySelector("#celsius-link");
celsiousLink.addEventListener("click", showCelsious);

function currentLocation(response) {
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  cityWeather(response);
}
function handlePosition(position) {
  let apiKey = "e14a13b38652811a3dc9a8a3e4d551f6";
  let positionApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(positionApiUrl).then(currentLocation);
}
function navigatorLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let localButton = document.querySelector("#local-button");
localButton.addEventListener("click", navigatorLocal);
