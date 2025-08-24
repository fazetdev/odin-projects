// API Configuration
const API_KEY = 'J39QFPBZ3KJGZTZ6S74XBUMHV';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// DOM Elements
const locationInput = document.getElementById('location');
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const locationName = document.getElementById('location-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const forecast = document.getElementById('forecast');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

currentLocationBtn.addEventListener('click', handleCurrentLocation);

// Improved Current Location Function
async function handleCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    currentLocationBtn.disabled = true;
    currentLocationBtn.textContent = 'Locating...';
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
        
        const { latitude, longitude } = position.coords;
        locationInput.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        await getWeatherData(`${latitude},${longitude}`);
        
    } catch (error) {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your location';
        
        if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Location access was denied. Please allow location access or enter manually.';
        } else if (error.code === error.TIMEOUT) {
            errorMessage = 'Location request timed out. Please try again or enter manually.';
        }
        
        showError(errorMessage);
    } finally {
        currentLocationBtn.disabled = false;
        currentLocationBtn.textContent = 'Use My Location';
    }
}

function handleSearch() {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        showError('Please enter a location');
    }
}

// Initialize with default location
getWeatherData('New York');

// Fetch weather data from Visual Crossing API
async function getWeatherData(location) {
    try {
        // Show loading state
        locationName.textContent = 'Loading...';
        clearWeatherData();
        
        // Encode the location for URL
        const encodedLocation = encodeURIComponent(location);
        const url = `${BASE_URL}/${encodedLocation}?unitGroup=metric&include=days,current&key=${API_KEY}&contentType=json`;
        
        const response = await fetch(url);
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text();
            throw new Error(textResponse || 'Server returned non-JSON data');
        }
        
        // Check response status
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API request failed');
        }
        
        const data = await response.json();
        
        // Validate data structure
        if (!data || !data.currentConditions) {
            throw new Error('Received incomplete weather data');
        }
        
        displayWeatherData(data);
    } catch (error) {
        console.error('Full error:', error);
        
        let userMessage = 'Failed to load weather data';
        if (error.message.includes('No account found')) {
            userMessage = 'Invalid API key - please check your Visual Crossing account';
        } else if (error.message.includes('exceeded')) {
            userMessage = 'API usage limit exceeded';
        } else if (error.message) {
            userMessage = error.message;
        }
        
        showError(userMessage);
    }
}

function clearWeatherData() {
    temperature.textContent = '--°C';
    weatherDescription.textContent = '--';
    humidity.textContent = '--%';
    wind.textContent = '-- km/h';
    pressure.textContent = '-- hPa';
    forecast.innerHTML = '';
    weatherIcon.src = '';
    weatherIcon.alt = '';
}

function showError(message) {
    locationName.textContent = message;
    clearWeatherData();
}

// Display weather data
function displayWeatherData(data) {
    // Current weather
    const current = data.currentConditions;
    locationName.textContent = `${data.resolvedAddress || data.address}`;
    temperature.textContent = `${Math.round(current.temp)}°C`;
    weatherDescription.textContent = current.conditions;
    humidity.textContent = `${current.humidity}%`;
    wind.textContent = `${Math.round(current.windspeed)} km/h`;
    pressure.textContent = `${current.pressure} hPa`;
    
    // Weather icon
    const iconName = getIconName(current.icon);
    weatherIcon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${iconName}.png`;
    weatherIcon.alt = current.conditions;
    
    // Forecast
    forecast.innerHTML = '';
    // Show next 5 days (skip today if showing current weather)
    const today = new Date().toISOString().split('T')[0];
    const startDay = data.days[0].datetime === today ? 1 : 0;
    
    for (let i = startDay; i < startDay + 10 && i < data.days.length; i++) {
        const day = data.days[i];
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        
        const date = new Date(day.datetime);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const iconName = getIconName(day.icon);
        
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img class="forecast-icon" src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${iconName}.png" alt="${day.conditions}">
            <div class="forecast-temp">
                <span class="high">${Math.round(day.tempmax)}°</span>
                <span class="low">${Math.round(day.tempmin)}°</span>
            </div>
        `;
        
        forecast.appendChild(forecastItem);
    }
}

// Map Visual Crossing icon names to their corresponding image names
function getIconName(icon) {
    const iconMap = {
        'snow': 'snow',
        'rain': 'rain',
        'fog': 'fog',
        'wind': 'wind',
        'cloudy': 'cloudy',
        'partly-cloudy-day': 'partly-cloudy-day',
        'partly-cloudy-night': 'partly-cloudy-night',
        'clear-day': 'clear-day',
        'clear-night': 'clear-night',
        'thunder-rain': 'thunder-showers',
        'thunder-showers-day': 'thunder-showers-day',
        'thunder-showers-night': 'thunder-showers-night',
        'showers-day': 'showers-day',
        'showers-night': 'showers-night'
    };
    
    return iconMap[icon] || 'clear-day';
}
