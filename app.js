const api = "dd60a7ab16b255f2e1122cdf7d8854ec"
const cityUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const weatherDescription = document.querySelector("#weatherDescription");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const weatherIcon = document.querySelector("#weather-image");

const showWeatherByLocation = async (location) => {
    try {
        const { coords: { latitude, longitude } } = location;;
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${api}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Location weather not available");
        const data = await res.json();

        updateWeather(data);
        console.log(data)

    } catch (err) {
        alert(err.message);
    }

}

const showWeatherByCity = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${api}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Location weather not available");
        const data = await res.json();

        updateWeather(data)
    } catch (err) {
        alert(err.message);
    }

}

const updateWeather = (data) => {
    cityName.innerText = data.name;
    temperature.innerText = `${Math.round(data.main.temp)}°C`;
    weatherDescription.innerText = data.weather[0].description;
    humidity.innerText = `${data.main.humidity}%`;
    windSpeed.innerText = `${data.wind.speed} km/h`;


    // Simple icon logic
    const condition = data.weather[0].main.toLowerCase().trim();
  setBackgroundByWeather(condition);

  if (condition.includes("cloud")) {
    weatherIcon.src = "./images/clouds.png";
  } else if (condition.includes("clear")) {
    weatherIcon.src = "./images/clear.png";
  } else if (condition.includes("rain")) {
    weatherIcon.src = "./images/rain.png";
  } else if (condition.includes("drizzle")) {
    weatherIcon.src = "./images/drizzle.png";
  } else if (
    ["mist", "smoke", "haze", "dust", "fog", "sand", "ash"]
      .some(type => condition.includes(type))
  ) {
    weatherIcon.src = "./images/mist.png";
  } else if (condition.includes("snow")) {
    weatherIcon.src = "./images/snow.png";
  } else if (condition.includes("thunderstorm")) {
    weatherIcon.src = "./images/thunderstorm.png";
  }

};


// // Search event
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    city && showWeatherByCity(city);
});

// // Enter key support
cityInput.addEventListener("keydown", (e) => {
    e.key === "Enter" && searchBtn.click();
});


window.addEventListener("load", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (location) => showWeatherByLocation(location)
        )
    } else {
        showWeatherByCity("karachi")
    }
});

const setBackgroundByWeather = (condition = "") => {
    switch (condition) {
        case "clear":
            setBg("#1e3c72", "#2a5298");
            break;

        case "clouds":
            setBg("#2c3e50", "#4b6cb7");
            break;

        case "rain":
        case "drizzle":
            setBg("#0f2027", "#203a43");
            break;

        case "thunderstorm":
            setBg("#232526", "#414345");
            break;

        case "snow":
            setBg("#141e30", "#243b55");
            break;

        case "mist":
        case "smoke":
        case "haze":
        case "dust":
        case "fog":
        case "sand":
        case "ash":
            setBg("#3a3a3a", "#1f1f1f");
            break;

        default:
            setBg("#121212", "#1f1f1f");
    }

};


function setBg(c1, c2) {
    document.body.style.background =
        `linear-gradient(180deg, ${c1}, ${c2})`;
}
