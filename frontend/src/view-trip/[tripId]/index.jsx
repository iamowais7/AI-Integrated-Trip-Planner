import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useTripStore from '@/store/tripStore';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import WeatherSection from '../components/WeatherSection';
import Footer from '../components/Footer';

const TABS = ['Overview', 'Hotels', 'Itinerary', 'Weather'];

function Viewtrip() {
  const { tripId } = useParams();
  const { currentTrip, loading, fetchTripById } = useTripStore();
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (tripId) {
      fetchTripById(tripId).catch(() => toast.error('Trip not found.'));
    }
  }, [tripId]);

  const trip = currentTrip;

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10 py-8">
      {/* Tab navigation */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 mb-8 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-max text-sm font-medium px-4 py-2 rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && <InfoSection trip={trip} loading={loading} />}
      {activeTab === 'Hotels' && <Hotels trip={trip} loading={loading} />}
      {activeTab === 'Itinerary' && <PlacesToVisit trip={trip} loading={loading} />}
      {activeTab === 'Weather' && (
        <WeatherSection location={trip?.userSelection?.location} />
      )}

      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
