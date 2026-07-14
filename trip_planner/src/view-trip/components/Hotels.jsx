import HotelCardItem from './HotelCardItem';
import { Building2 } from 'lucide-react';

function Hotels({ trip, loading }) {
  if (loading || !trip) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-border">
            <div className="h-[180px] bg-muted animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-3 bg-muted animate-pulse rounded w-full" />
              <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const hotels = trip?.tripData?.hotels;
  if (!hotels?.length) return null;

  return (
    <div>
      <h2 className="font-extrabold text-2xl mb-6 flex items-center gap-2">
        <Building2 className="h-6 w-6 text-primary" /> Hotel Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel, index) => (
          <HotelCardItem hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
