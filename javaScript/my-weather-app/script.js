// ===== API CONFIG =====
const API_KEY = "J39QFPBZ3KJGZTZ6S74XBUMHV";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const UNSPLASH_KEY = "O_BdvH-xQgEQLTUuaCXXyaEwLlKMpRp7_wJhO0gcPXk";

// ===== DOM ELEMENTS =====
const locationBtn = document.getElementById("location-btn");
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const nameForm = document.getElementById("name-form");
const userNameInput = document.getElementById("user-name");
const historyList = document.getElementById("history-list");

const weatherResult = document.getElementById("weather-result");

// ===== INITIAL LOAD =====
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    document.querySelector(".sidebar h2").textContent = `Welcome, ${savedName}`;
  }
  loadHistory();
  fetchWeather("Kano");
});

// ===== FUNCTIONS =====
async function fetchWeather(query) {
  showLoading();

  try {
    const url = `${BASE_URL}/${query}?unitGroup=metric&key=${API_KEY}&contentType=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    renderWeather(data);
    saveHistory(data.address);
  } catch (error) {
    showError(error.message);
  }
}

// Show loading state
function showLoading() {
  weatherResult.innerHTML = `<p>Loading weather data...</p>`;
}

// Show error state
function showError(message) {
  weatherResult.innerHTML = `<p style="color:red;">${message}</p>`;
}

// Render weather data into DOM
async function renderWeather(data) {
  const today = data.days[0];

  // Try to fetch image from Unsplash
  let imgUrl = "";
  try {
    const imgRes = await fetch(
      `https://api.unsplash.com/search/photos?query=${data.address} weather&client_id=${UNSPLASH_KEY}`
    );
    const imgData = await imgRes.json();
    imgUrl = imgData.results[0]?.urls?.regular || "";
  } catch (err) {
    imgUrl = "";
  }

  // Fallback if no Unsplash image
  if (!imgUrl) {
    if (today.icon.includes("rain")) imgUrl = "images/rainy.jpg";
    else if (today.icon.includes("snow") || today.icon.includes("ice")) imgUrl = "images/icy.jpg";
    else imgUrl = "images/sunny.jpg";
  }

  weatherResult.innerHTML = `
    <div class="weather-card">
      <img class="bg" src="${imgUrl}" alt="${today.icon}">
      <div class="weather-details">
        <h2>${data.address}</h2>
        <p><strong>Temperature:</strong> 🌡️ ${today.temp}°C</p>
        <p><strong>Wind:</strong> 💨 ${today.windspeed} km/h</p>
        <p><strong>Humidity:</strong> 💧 ${today.humidity}%</p>
        <p><strong>Rain:</strong> ☔ ${today.precipprob > 0 ? today.precipprob + "%" : "No rain expected"}</p>
      </div>
    </div>
  `;
}

// ===== HISTORY =====
function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  if (!history.includes(city)) {
    history.unshift(city);
    if (history.length > 5) history.pop(); // Keep max 5
    localStorage.setItem("history", JSON.stringify(history));
  }
  loadHistory();
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  historyList.innerHTML = "";
  history.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => fetchWeather(city));
    historyList.appendChild(li);
  });
}

// ===== EVENT LISTENERS =====
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      () => {
        showError("Could not get your location");
      }
    );
  } else {
    showError("Geolocation not supported");
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = userNameInput.value.trim();
  if (name) {
    localStorage.setItem("userName", name);
    document.querySelector(".sidebar h2").textContent = `Welcome, ${name}`;
    userNameInput.value = "";
  }
});
