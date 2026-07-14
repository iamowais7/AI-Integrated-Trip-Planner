import { Link } from 'react-router-dom';
import { useImage } from '@/hooks/useImage';
import { MapPin, Clock } from 'lucide-react';

function UserTripCardItem({ trip }) {
  const photoUrl = useImage(trip?.userSelection?.location);

  return (
    <Link to={`/view-trip/${trip?._id}`}>
      <div className="rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
        <div className="relative h-[200px] bg-muted overflow-hidden">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={trip?.userSelection?.location}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 animate-pulse" />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h2 className="font-bold text-white text-lg leading-tight">{trip?.userSelection?.location}</h2>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {trip?.userSelection?.noOfDays} days
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {trip?.userSelection?.budget} budget
          </span>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
