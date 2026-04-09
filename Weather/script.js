const apiKey = "5867774b7863745bf1d3cab710133d57";

const searchBtn = document.getElementById("searchBtn");
const weatherBox = document.getElementById("weather");

searchBtn.addEventListener("click", getWeather);

document.getElementById("city").addEventListener("keypress", function (e) {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return;

  weatherBox.classList.remove("show");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    );

    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found 😢");
      return;
    }

    // 🌡 Temperature
    document.getElementById("temp").innerText =
      Math.round(data.main.temp) + "°C";

    // 🌥 Description
    document.getElementById("desc").innerText = data.weather[0].description;

    // 💧 Humidity
    document.getElementById("humidity").innerText = data.main.humidity + "%";

    // 🌬 Wind
    document.getElementById("wind").innerText = data.wind.speed + " m/s";

    // 📊 Pressure
    document.getElementById("pressure").innerText = data.main.pressure + " hPa";

    // 🌤 Weather Icon
    const iconCode = data.weather[0].icon;
    document.getElementById("icon").src =
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    changeBackground(data.weather[0].main);

    setTimeout(() => {
      weatherBox.classList.add("show");
    }, 100);
  } catch (error) {
    alert("Something went wrong ⚠️");
  }
}

function changeBackground(weather) {
  const body = document.body;

  if (weather === "Clear") {
    body.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
  } else if (weather === "Clouds") {
    body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
  } else if (weather === "Rain") {
    body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
  } else if (weather === "Snow") {
    body.style.background = "linear-gradient(135deg, #e6dada, #274046)";
  } else {
    body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
  }
}
