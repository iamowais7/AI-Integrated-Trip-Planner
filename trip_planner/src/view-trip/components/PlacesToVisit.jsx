import PlaceCardItem from './PlaceCardItem';
import { MapPin } from 'lucide-react';

function PlacesToVisit({ trip, loading }) {
  if (loading || !trip) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[130px] bg-muted animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  const itinerary = trip?.tripData?.itinerary;
  if (!itinerary) return null;

  const days = Object.keys(itinerary).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return (
    <div>
      <h2 className="font-extrabold text-2xl mb-6 flex items-center gap-2">
        <MapPin className="h-6 w-6 text-primary" /> Itinerary
      </h2>
      <div className="space-y-8">
        {days.map((dayKey, index) => {
          const dayData = itinerary[dayKey];
          return (
            <div key={index}>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full capitalize">{dayKey}</span>
                {dayData.theme && <span className="text-muted-foreground text-sm">{dayData.theme}</span>}
                {dayData.bestTimeToVisit && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full">
                    Best: {dayData.bestTimeToVisit}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dayData.places?.map((place, i) => (
                  <PlaceCardItem key={i} place={place} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
