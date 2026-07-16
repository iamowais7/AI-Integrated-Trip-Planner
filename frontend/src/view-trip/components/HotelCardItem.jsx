import { useImage } from '@/hooks/useImage';
import { MapPin, Star, Wallet, ExternalLink } from 'lucide-react';

function HotelCardItem({ hotel }) {
  const photoUrl = useImage(hotel?.hotelName);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ',' + hotel?.hotelAddress)}`;
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel?.hotelName)}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
      <div className="relative h-[180px] bg-muted overflow-hidden shrink-0">
        {photoUrl ? (
          <img src={photoUrl} alt={hotel?.hotelName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 animate-pulse" />
        )}
      </div>

      <div className="p-4 space-y-1.5 flex-1">
        <h2 className="font-bold text-sm leading-tight">{hotel?.hotelName}</h2>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3 shrink-0" /> {hotel?.hotelAddress}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2">{hotel?.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
            <Wallet className="h-3 w-3" /> {hotel?.price}
          </span>
          <span className="text-xs flex items-center gap-1 text-yellow-500 font-medium">
            <Star className="h-3 w-3 fill-yellow-400" /> {hotel?.rating}
          </span>
        </div>
      </div>

      {/* Booking links */}
      <div className="flex border-t border-border divide-x divide-border">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Google Maps
        </a>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Book Now
        </a>
      </div>
    </div>
  );
}

export default HotelCardItem;
