import { useImage } from '@/hooks/useImage';
import { MapPin, Star, Ticket, Clock, ExternalLink } from 'lucide-react';

function PlaceCardItem({ place }) {
  const photoUrl = useImage(place?.placeName);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`;

  return (
    <div className="flex gap-4 border border-border rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
      <div className="relative w-[110px] h-[110px] shrink-0 rounded-xl overflow-hidden bg-muted">
        {photoUrl ? (
          <img src={photoUrl} alt={place?.placeName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 animate-pulse" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-base leading-tight mb-1">{place?.placeName}</h2>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{place?.placeDetails}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {place?.ticketPricing && (
              <span className="flex items-center gap-1"><Ticket className="h-3 w-3" /> {place.ticketPricing}</span>
            )}
            {place?.rating && (
              <span className="flex items-center gap-1 text-yellow-500"><Star className="h-3 w-3 fill-yellow-400" /> {place.rating}</span>
            )}
            {place?.timeTravel && (
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {place.timeTravel}</span>
            )}
          </div>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 self-start inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <MapPin className="h-3.5 w-3.5" /> Open in Google Maps <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

export default PlaceCardItem;
