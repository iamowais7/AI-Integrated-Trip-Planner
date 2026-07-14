import { useEffect, useState } from 'react';
import api from '@/api/client';
import { Cloud, Droplets } from 'lucide-react';

function WeatherSection({ location }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    api.get(`/weather?location=${encodeURIComponent(location)}`)
      .then((res) => setWeather(res.data))
      .catch(() => setError('Could not load weather data.'))
      .finally(() => setLoading(false));
  }, [location]);

  if (!location) return null;

  if (loading) {
    return (
      <div>
        <h2 className="font-extrabold text-2xl mb-6 flex items-center gap-2">
          <Cloud className="h-6 w-6 text-primary" /> Weather Forecast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-28 bg-muted animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <Cloud className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div>
      <h2 className="font-extrabold text-2xl mb-2 flex items-center gap-2">
        <Cloud className="h-6 w-6 text-primary" /> Weather Forecast
      </h2>
      <p className="text-muted-foreground text-sm mb-6">{weather.location} — Next 7 days</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {weather.forecast.map((day, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 bg-secondary rounded-2xl p-4 text-center"
          >
            <p className="text-xs text-muted-foreground font-medium">
              {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
            </p>
            <span className="text-3xl my-1">{day.icon}</span>
            <p className="text-sm font-bold">{Math.round(day.maxTemp)}°C</p>
            <p className="text-xs text-muted-foreground">{Math.round(day.minTemp)}°C</p>
            {day.precipitation > 0 && (
              <p className="text-xs text-blue-500 flex items-center gap-0.5 mt-1">
                <Droplets className="h-3 w-3" /> {day.precipitation}mm
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1 leading-tight">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherSection;
