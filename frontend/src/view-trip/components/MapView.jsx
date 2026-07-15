import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const HOTEL_COLOR = '#3b82f6';
const DAY_COLORS = ['#f97316', '#8b5cf6', '#10b981', '#ef4444', '#f59e0b', '#06b6d4', '#ec4899', '#84cc16', '#6366f1', '#14b8a6'];

function MapView({ trip }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || !trip?.tripData) return;

    const hotels = trip.tripData.hotels || [];
    const itinerary = trip.tripData.itinerary || {};

    const allPoints = [];

    hotels.forEach((h) => {
      if (h.geoCoordinates?.latitude && h.geoCoordinates?.longitude) {
        allPoints.push({ lng: h.geoCoordinates.longitude, lat: h.geoCoordinates.latitude });
      }
    });

    Object.values(itinerary).forEach((day) => {
      (day.places || []).forEach((p) => {
        if (p.geoCoordinates?.latitude && p.geoCoordinates?.longitude) {
          allPoints.push({ lng: p.geoCoordinates.longitude, lat: p.geoCoordinates.latitude });
        }
      });
    });

    if (allPoints.length === 0) return;

    const center = allPoints[0];

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [center.lng, center.lat],
      zoom: 11,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      // Hotel markers
      hotels.forEach((hotel) => {
        const { latitude, longitude } = hotel.geoCoordinates || {};
        if (!latitude || !longitude) return;

        const el = document.createElement('div');
        el.className = 'mapbox-marker-hotel';
        el.style.cssText = `
          width: 32px; height: 32px; border-radius: 50%;
          background: ${HOTEL_COLOR}; border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 14px;
        `;
        el.innerHTML = '🏨';

        const popup = new mapboxgl.Popup({ offset: 20, maxWidth: '240px' }).setHTML(`
          <div style="font-family: sans-serif; padding: 4px;">
            <p style="font-weight: 700; margin: 0 0 4px;">${hotel.hotelName}</p>
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px;">${hotel.hotelAddress || ''}</p>
            <div style="display: flex; gap: 8px; font-size: 12px;">
              <span>⭐ ${hotel.rating ?? '—'}</span>
              <span>💰 ${hotel.price || '—'}</span>
            </div>
          </div>
        `);

        new mapboxgl.Marker({ element: el })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map);
      });

      // Place markers per day
      Object.entries(itinerary).forEach(([dayKey, day], dayIndex) => {
        const color = DAY_COLORS[dayIndex % DAY_COLORS.length];
        const dayNum = dayIndex + 1;

        (day.places || []).forEach((place, placeIndex) => {
          const { latitude, longitude } = place.geoCoordinates || {};
          if (!latitude || !longitude) return;

          const el = document.createElement('div');
          el.style.cssText = `
            width: 28px; height: 28px; border-radius: 50%;
            background: ${color}; border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; color: white; font-size: 11px; font-weight: 700;
          `;
          el.innerHTML = `${dayNum}.${placeIndex + 1}`;

          const popup = new mapboxgl.Popup({ offset: 18, maxWidth: '240px' }).setHTML(`
            <div style="font-family: sans-serif; padding: 4px;">
              <p style="font-size: 11px; color: ${color}; font-weight: 600; margin: 0 0 2px;">Day ${dayNum} · ${day.theme || ''}</p>
              <p style="font-weight: 700; margin: 0 0 4px;">${place.placeName}</p>
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px;">${place.placeDetails?.slice(0, 80) || ''}...</p>
              <div style="display: flex; gap: 8px; font-size: 12px;">
                <span>⭐ ${place.rating ?? '—'}</span>
                <span>🎫 ${place.ticketPricing || 'Free'}</span>
              </div>
            </div>
          `);

          new mapboxgl.Marker({ element: el })
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map);
        });
      });

      // Fit map to show all markers
      if (allPoints.length > 1) {
        const bounds = allPoints.reduce(
          (b, p) => b.extend([p.lng, p.lat]),
          new mapboxgl.LngLatBounds([allPoints[0].lng, allPoints[0].lat], [allPoints[0].lng, allPoints[0].lat])
        );
        map.fitBounds(bounds, { padding: 60, maxZoom: 14 });
      }
    });

    return () => map.remove();
  }, [trip]);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow" />
          <span className="text-muted-foreground">Hotels</span>
        </div>
        {Object.entries(trip?.tripData?.itinerary || {}).map(([key, day], i) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow"
              style={{ background: DAY_COLORS[i % DAY_COLORS.length] }}
            />
            <span className="text-muted-foreground">Day {i + 1}{day.theme ? ` — ${day.theme}` : ''}</span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div
        ref={mapContainer}
        className="w-full rounded-2xl overflow-hidden border border-border shadow-md"
        style={{ height: '520px' }}
      />

      <p className="text-xs text-muted-foreground text-center">
        Click any marker to see details · Hotels in blue · Days in color
      </p>
    </div>
  );
}

export default MapView;
