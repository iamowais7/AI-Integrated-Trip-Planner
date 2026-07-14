import axios from 'axios';

export const getWeather = async (req, res) => {
  const { location } = req.query;
  if (!location) return res.status(400).json({ message: 'location is required' });

  try {
    // Geocode city name to lat/lng using Open-Meteo geocoding (free, no key)
    const cityName = location.split(',')[0].trim();
    const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: { name: cityName, count: 1, language: 'en', format: 'json' },
    });

    const place = geoRes.data.results?.[0];
    if (!place) return res.status(404).json({ message: 'Location not found' });

    const { latitude, longitude, name, country } = place;

    // Fetch 7-day forecast
    const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        daily: 'temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum',
        timezone: 'auto',
        forecast_days: 7,
      },
    });

    const daily = weatherRes.data.daily;

    const forecast = daily.time.map((date, i) => ({
      date,
      maxTemp: daily.temperature_2m_max[i],
      minTemp: daily.temperature_2m_min[i],
      weatherCode: daily.weathercode[i],
      precipitation: daily.precipitation_sum[i],
      description: getWeatherDescription(daily.weathercode[i]),
      icon: getWeatherIcon(daily.weathercode[i]),
    }));

    res.json({ location: `${name}, ${country}`, forecast });
  } catch (err) {
    console.error('Weather fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch weather' });
  }
};

function getWeatherDescription(code) {
  if (code === 0) return 'Clear sky';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code <= 49) return 'Foggy';
  if (code <= 59) return 'Drizzle';
  if (code <= 69) return 'Rain';
  if (code <= 79) return 'Snow';
  if (code <= 84) return 'Rain showers';
  if (code <= 94) return 'Thunderstorm';
  return 'Severe thunderstorm';
}

function getWeatherIcon(code) {
  if (code === 0) return '☀️';
  if (code <= 2) return '⛅';
  if (code === 3) return '☁️';
  if (code <= 49) return '🌫️';
  if (code <= 69) return '🌧️';
  if (code <= 79) return '❄️';
  if (code <= 84) return '🌦️';
  return '⛈️';
}
