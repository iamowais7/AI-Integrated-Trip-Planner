import axios from 'axios';

const weatherCache = new Map();
const CACHE_TTL = 3 * 60 * 60 * 1000; // 3 hours

export const getWeather = async (req, res) => {
  const { location } = req.query;
  if (!location) return res.status(400).json({ message: 'location is required' });

  try {
    const cityName = location.split(',')[0].trim();
    console.log('[Weather] Input location:', location);
    console.log('[Weather] City name extracted:', cityName);

    // Return cached result if fresh
    const cacheKey = cityName.toLowerCase();
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      console.log('[Weather] Serving from cache:', cacheKey);
      return res.json(cached.data);
    }

    const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: { name: cityName, count: 1, language: 'en', format: 'json' },
    });
    console.log('[Weather] Geo API status:', geoRes.status);
    console.log('[Weather] Geo results:', JSON.stringify(geoRes.data));

    const place = geoRes.data.results?.[0];
    if (!place) return res.status(404).json({ message: 'Location not found' });

    const { latitude, longitude, name, country } = place;
    console.log('[Weather] Resolved place:', name, country, latitude, longitude);

    const forecastParams = {
      latitude, longitude,
      daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum',
      timezone: 'auto', forecast_days: 7,
    };

    let weatherRes;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', { params: forecastParams });
        break;
      } catch (e) {
        console.log(`[Weather] Forecast attempt ${attempt} failed: ${e.response?.status} ${e.message}`);
        if (e.response?.status === 429 && attempt < 3) {
          await new Promise((r) => setTimeout(r, attempt * 1000));
        } else {
          throw e;
        }
      }
    }
    console.log('[Weather] Forecast API status:', weatherRes.status);
    console.log('[Weather] Daily keys:', Object.keys(weatherRes.data.daily || {}));

    const daily = weatherRes.data.daily;
    const wCode = daily.weather_code ?? daily.weathercode;
    console.log('[Weather] weather_code sample:', wCode?.slice(0, 3));

    const forecast = daily.time.map((date, i) => ({
      date,
      maxTemp: daily.temperature_2m_max[i],
      minTemp: daily.temperature_2m_min[i],
      weatherCode: wCode[i],
      precipitation: daily.precipitation_sum[i],
      description: getWeatherDescription(wCode[i]),
      icon: getWeatherIcon(wCode[i]),
    }));

    const result = { location: `${name}, ${country}`, forecast };
    weatherCache.set(cacheKey, { data: result, ts: Date.now() });
    res.json(result);
  } catch (err) {
    console.error('[Weather] ERROR:', err.message);
    console.error('[Weather] Stack:', err.stack);
    res.status(500).json({ message: 'Failed to fetch weather', detail: err.message });
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
