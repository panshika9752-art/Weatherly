const weatherApi = {
  key: "160c8ada4c042d4a917edf6de9835a57",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};
const txtInput = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");

const hTemp = document.getElementById("temp");
const hcity = document.getElementById("city-name");

const divWeatherBody = document.getElementById("weather-body");
const divError = document.getElementById("error-message");

const pDate = document.getElementById("date");
const pMinMaxTemp = document.getElementById("min-max-temperature");

const pWeather = document.getElementById("weather");
const pHumidity = document.getElementById("humidity");

const pWind = document.getElementById("wind");
const pPressure = document.getElementById("pressure");

txtInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    await getWeatherReport(event.target.value);
  }
});
searchBtn.addEventListener("click", async () => {
  await getWeatherReport(txtInput.value);
});
async function getWeatherReport(city) {
  try {
    const response = await fetch(
      `${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`,
    );
    const date = await response.json();
    showWeatherReport(date);
    divWeatherBody.classList.remove("d-none");
    divError.classList.add("d-none");
        if (!response.ok) {
            throw new Error("City not found");
        }
    // const weatherData = await response.json();
    // updateWeatherDisplay(weatherData);
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    divWeatherBody.classList.add("d-none");
    divError.classList.remove("d-none");
    clearWeatherDisplay();
  }
}
function showWeatherReport(weather) {
  hcity.innerText = `${weather.name}, ${weather.sys.country}`;
  hTemp.innerText = `${Math.round(weather.main.temp)}°C`;
  pMinMaxTemp.innerText = `Min: ${Math.round(weather.main.temp_min)}°C | Max: ${Math.ceil(weather.main.temp_max)}°C`;
  pHumidity.innerText = `Humidity: ${weather.main.humidity}%`;
  pWind.innerText = `Wind Speed: ${weather.wind.speed} kmph`;
  pPressure.innerText = `Pressure: ${weather.main.pressure} hPa`;
  pWeather.innerText = `${weather.weather[0].main}`;
  updateBackground(weather.weather[0].main);
  pDate.innerText = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long"
  });
}

// bhopal dubai mumbai london
function updateBackground(description) {
    const backgroundImage={
        Clear: "images/clear.jpg",
        Clouds: "images/clouds.jpg",
        Rain: "images/rain.jpg",
        Snow: "images/snow.avif",
        Thunderstorm: "images/thunder.avif",
        Haze: "images/clouds.jpg",
        Sunny: "images/sunny.jpg",
    };
    document.body.style.backgroundImage = `url(${backgroundImage[description]||"images/clear1.jpg"})`;
}
function clearWeatherDisplay() {
  hcity.innerText = "";
  hTemp.innerText = "";
  pMinMaxTemp.innerText = "";
  pHumidity.innerText = "";
  pWind.innerText = "";
  pPressure.innerText = "";
  pWeather.innerText = "";
  pDate.innerText = "";
}
