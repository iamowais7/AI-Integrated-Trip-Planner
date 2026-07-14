import { useEffect } from 'react';
import useTripStore from '@/store/tripStore';
import UserTripCardItem from './components/UserTripCardItem';
import Footer from '@/view-trip/components/Footer';
import { Map } from 'lucide-react';

function Mytrips() {
  const { trips, loading, fetchMyTrips } = useTripStore();

  useEffect(() => {
    fetchMyTrips();
  }, []);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mb-10">
      <div className="flex items-center gap-3 mb-8">
        <Map className="h-8 w-8 text-primary" />
        <h2 className="font-extrabold text-3xl">My Trips</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border">
                <div className="h-[200px] bg-muted animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </div>
            ))
          : trips.length > 0
          ? trips.map((trip) => <UserTripCardItem key={trip._id} trip={trip} />)
          : (
              <div className="col-span-3 text-center py-20 text-muted-foreground">
                <Map className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-xl font-medium">No trips yet</p>
                <p className="text-sm mt-1">Create your first AI trip plan!</p>
              </div>
            )}
      </div>
      <Footer />
    </div>
  );
}

export default Mytrips;
