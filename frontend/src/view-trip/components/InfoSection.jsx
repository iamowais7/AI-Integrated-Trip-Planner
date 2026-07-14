import { useState } from 'react';
import { useImage } from '@/hooks/useImage';
import { Calendar, Wallet, Users, Share2, Download, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShareModal from './ShareModal';
import TripEditModal from './TripEditModal';
import { exportTripPdf } from '@/lib/pdfExport';

function InfoSection({ trip, loading }) {
  const photoUrl = useImage(trip?.userSelection?.location);
  const [showShare, setShowShare] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  if (loading || !trip) {
    return (
      <div>
        <div className="h-[340px] w-full bg-muted animate-pulse rounded-2xl mb-6" />
        <div className="space-y-2">
          <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[340px] w-full overflow-hidden rounded-2xl mb-6">
        {photoUrl ? (
          <img src={photoUrl} alt={trip.userSelection?.location} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-300 to-purple-400 dark:from-blue-800 dark:to-purple-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-5 left-5">
          <h1 className="font-extrabold text-3xl text-white">{trip.userSelection?.location}</h1>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-full">
            <Calendar className="h-3.5 w-3.5" /> {trip.userSelection?.noOfDays} Days
          </span>
          <span className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-full">
            <Wallet className="h-3.5 w-3.5" /> {trip.userSelection?.budget} Budget
          </span>
          <span className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-full">
            <Users className="h-3.5 w-3.5" /> {trip.userSelection?.traveler}
          </span>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowEdit(true)} className="gap-1.5">
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportTripPdf(trip)} className="gap-1.5">
            <Download className="h-4 w-4" /> PDF
          </Button>
          <Button size="sm" onClick={() => setShowShare(true)} className="gap-1.5">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      {trip.notes && (
        <div className="mt-4 p-4 bg-muted rounded-xl text-sm text-muted-foreground">
          <strong className="text-foreground">Notes: </strong>{trip.notes}
        </div>
      )}

      <ShareModal open={showShare} onClose={() => setShowShare(false)} tripId={trip._id} />
      <TripEditModal open={showEdit} onClose={() => setShowEdit(false)} trip={trip} />
    </div>
  );
}

export default InfoSection;
