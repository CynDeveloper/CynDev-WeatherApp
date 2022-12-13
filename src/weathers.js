function formattedDate(currentdate) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`; // we do this b/c"getHours function turns output into an interger...but we want a string
  }
  let currentMinutes = date.getMinutes();

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`; //we do this becuase there is no such thing as 14:5 ..but 14:05 is correct fpr example let dayIndex = currentTime.getDay(); //0-6 .. this is the index of the array"days"
  }

  let dayIndex = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // so to console.log this it would be , console.log (days[dayIndex]); its looking inside the days Array to match the # with the day
  //so for ex  if cuurentTime/getDay =2 , that would === Wednesday b/c Wed=== 2.
  let day = days[dayIndex];
  return `${day} ${currentHour}:${currentMinutes}`;
  // the return needs to be at the end b/c its sigaling for the code to end
}

function switchtocelcius(event) {
  event.preventDefault();
}
function switchtofahrenheit(event) {
  event.preventDefault();
}

//function 1
let currentElement = document.querySelector("#thedate");
let date = new Date();
currentElement.innerHTML = formattedDate(date);

//function 2

//function 3

let celcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");

celcius.addEventListener("click", switchtocelcius);
fahrenheit.addEventListener("click", switchtofahrenheit);

//weather functions

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city-element").innerHTML = response.data.name;
  document.querySelector("#todays-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  document.querySelector("#coverage").innerHTML = `${
    response.data.weather[0].main
  } ${"today"}`;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "789b5567dcef9deb45a41de07c182eda";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-box").value;
  searchCity(city);
  //make an API call to Open Weather API
  //ONCE I get the HTTP response, we display city name
}

function searchLocation(position) {
  let apiKey = "789b5567dcef9deb45a41de07c182eda";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// inside "show location" we are building the api, then at the end we are calling it to go to the open weather
// website and lastly going to the  show temp

let currentSearchForm = document.querySelector("#current-location");
currentSearchForm.addEventListener("click", getCurrentLocation);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Los Angeles");
