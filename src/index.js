// In your project, display the current date and time using JavaScript: Tuesday 16:00
function showSignUpFormValues(event) {
  let currentDate = new Date();
  let weekDay = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thuday",
    "Friday",
    "Satday",
  ];
  weekDay = weekDay[currentDate.getDay()];
  let cityTime = document.querySelector("p#time");
  if (currentDate.getMinutes() < 10) {
    let newDate = `${weekDay} ${currentDate.getHours()}:0${currentDate.getMinutes()}`;
    cityTime.innerHTML = newDate;
  } else {
    let newDate = `${weekDay} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    cityTime.innerHTML = newDate;
  }
}

// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
// it should display the name of the city on the result page and the current temperature of the city.
let apiKey = "e14a13b38652811a3dc9a8a3e4d551f6";
function showWeatherData(response) {
  document.querySelector("#temp-num").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].main}`;
  document.querySelector("#speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
}

function search(city) {
  document.querySelector("p#city").innerHTML = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherData);
}

function handleSubmit() {
  // подумать куда перенести эту функцию
  let city = document.querySelector("#input-city").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// show city by default
search("Kyiv");
showSignUpFormValues(event);

// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and
// the city and current temperature using the OpenWeather API.

function currentLocationTemp(response) {
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  showWeatherData(response);
}
function handlePosition(position) {
  let positionApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(positionApiUrl).then(currentLocationTemp);
}
function navigatorLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let localButton = document.querySelector("#local-button");
localButton.addEventListener("click", navigatorLocal);

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
