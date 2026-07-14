import { Link } from 'react-router-dom';
import { useImage } from '@/hooks/useImage';
import { MapPin, Star, Wallet } from 'lucide-react';

function HotelCardItem({ hotel }) {
  const photoUrl = useImage(hotel?.hotelName);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ',' + hotel?.hotelAddress)}`}
      target="_blank"
    >
      <div className="rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
        <div className="relative h-[180px] bg-muted overflow-hidden">
          {photoUrl ? (
            <img src={photoUrl} alt={hotel?.hotelName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 animate-pulse" />
          )}
        </div>
        <div className="p-4 space-y-1.5">
          <h2 className="font-bold text-sm leading-tight">{hotel?.hotelName}</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3 shrink-0" /> {hotel?.hotelAddress}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
              <Wallet className="h-3 w-3" /> {hotel?.price}
            </span>
            <span className="text-xs flex items-center gap-1 text-yellow-500 font-medium">
              <Star className="h-3 w-3 fill-yellow-400" /> {hotel?.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
