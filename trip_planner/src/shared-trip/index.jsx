import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/api/client';
import { useImage } from '@/hooks/useImage';
import PlacesToVisit from '@/view-trip/components/PlacesToVisit';
import Hotels from '@/view-trip/components/Hotels';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, Wallet, Users } from 'lucide-react';

function SharedTripHero({ trip }) {
  const photoUrl = useImage(trip?.userSelection?.location);
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl mb-6">
      {photoUrl ? (
        <img src={photoUrl} alt={trip.userSelection?.location} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-300 to-purple-400" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-5 left-5">
        <h1 className="font-extrabold text-3xl text-white">{trip.userSelection?.location}</h1>
      </div>
    </div>
  );
}

function SharedTripView() {
  const { shareId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Hotels');

  useEffect(() => {
    api.get(`/trips/share/${shareId}`)
      .then((res) => setTrip(res.data))
      .catch(() => setError('This trip link is invalid or has been removed.'))
      .finally(() => setLoading(false));
  }, [shareId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="h-[300px] bg-muted animate-pulse rounded-2xl mb-6" />
        <div className="h-8 bg-muted animate-pulse rounded w-1/3 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-[200px] bg-muted animate-pulse rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 px-5">
        <h2 className="text-2xl font-bold mb-2">Trip not found</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Link to="/"><Button>Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10 py-8">
      {/* Shared badge */}
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
          <Sparkles className="h-4 w-4" /> AI-Generated Trip Plan
        </span>
        <Link to="/create-trip">
          <Button size="sm" variant="outline">Create My Own Trip</Button>
        </Link>
      </div>

      <SharedTripHero trip={trip} />

      <div className="flex flex-wrap gap-2 mb-6">
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

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 mb-8">
        {['Hotels', 'Itinerary'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-sm font-medium px-4 py-2 rounded-lg transition-all ${
              activeTab === tab ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Hotels' && <Hotels trip={trip} />}
      {activeTab === 'Itinerary' && <PlacesToVisit trip={trip} />}
    </div>
  );
}

export default SharedTripView;
