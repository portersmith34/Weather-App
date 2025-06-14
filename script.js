const apiKey = "5f9efc1b9f779147d314ba98a2e33425 ";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

// Add event listeners for search button and input field
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  checkWeather();
});
const inputField = document.querySelector(".search input");
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather();
  }
});

// Function to show error message
function showError() {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
}

// Check weather for default city
async function checkWeather() {
  let cityName = "";
  if (document.querySelector(".search input").value) {
    cityName = document.querySelector(".search input").value;
  }
  const response = await fetch(apiUrl + cityName + "&appid=" + apiKey);
  let data = await response.json();

  // If the city is not found or the input is empty, show error
  if (data.cod === "404" || !cityName) {
    showError();
    return;
  }
  // If the city is found, hide the error and display the weather
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";

  // Update the weather details in the UI
  document.querySelector(".cityName").innerText = data.name;
  document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°F";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText =
    Math.round(data.wind.speed) + " mph";

  // Update the weather icon based on the weather condition
  const weatherCondition = data.weather[0].main.toLowerCase();
  const weatherIcon = document.querySelector(".weather-icon");
  if (weatherCondition === "rain") {
    weatherIcon.src = "images/rain.png";
  } else if (weatherCondition === "drizzle") {
    weatherIcon.src = "images/rain.png";
  } else if (weatherCondition === "thunderstorm") {
    weatherIcon.src = "images/thunderstorm.png";
  } else if (weatherCondition === "clouds") {
    weatherIcon.src = "images/cloudy.png";
  } else if (weatherCondition === "clear") {
    weatherIcon.src = "images/sun.png";
  } else if (weatherCondition === "snow") {
    weatherIcon.src = "images/snow.png";
  } else weatherIcon.src = "images/sun.png";
  weatherIcon.title = weatherCondition;
}
