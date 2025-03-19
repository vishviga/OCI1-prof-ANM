// script.js

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', function() {
  const city = document.getElementById('city').value;
  if (city) {
    getWeatherData(city);
  }
});

function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        displayError("City not found. Please try again.");
      } else {
        displayWeather(data);
      }
    })
    .catch(error => {
      displayError("Error fetching weather data. Please try again.");
    });
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

function displayError(message) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `<p style="color: red;">${message}</p>`;
}
