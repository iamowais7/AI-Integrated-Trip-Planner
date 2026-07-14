import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import Footer from '@/view-trip/components/Footer';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapboxAutocomplete = ({ onchange }) => {
  const geocoderContainer = useRef(null);
  const geocoderRef = useRef(null);
  const onchangeRef = useRef(onchange);
  onchangeRef.current = onchange;

  useEffect(() => {
    if (!geocoderContainer.current) return;
    geocoderRef.current = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      types: 'place',
      placeholder: 'Search for a city or destination...',
      marker: false,
    });
    geocoderRef.current.addTo(geocoderContainer.current);
    geocoderRef.current.on('result', (event) => {
      onchangeRef.current?.(event.result);
    });
    return () => {
      geocoderRef.current?.onRemove();
      geocoderRef.current = null;
    };
  }, []);

  return <div ref={geocoderContainer} className="mapbox-geocoder-wrapper" />;
};

MapboxAutocomplete.propTypes = { onchange: PropTypes.func.isRequired };

const CreateTrip = () => {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streamStatus, setStreamStatus] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuthStore();

  const handleInputChange = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenRes) => {
      try {
        await login(tokenRes.access_token);
        setOpenDialog(false);
        toast.success('Logged in! Generating your trip...');
        setTimeout(() => onGenerateTrip(), 500);
      } catch {
        toast.error('Login failed. Please try again.');
      }
    },
    onError: () => toast.error('Google login failed.'),
  });

  const onGenerateTrip = async () => {
    if (!isLoggedIn) return setOpenDialog(true);

    const { noOfDays, location, budget, traveler } = formData;
    if (!location || !budget || !traveler || !noOfDays) {
      toast.warning('Please fill in all details.');
      return;
    }
    if (noOfDays < 1 || noOfDays > 10) {
      toast.warning('Days must be between 1 and 10.');
      return;
    }

    setLoading(true);
    setStreamStatus('Connecting to AI...');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ location, noOfDays: Number(noOfDays), budget, traveler }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let tripId = null;
      let cached = false;

      setStreamStatus('AI is crafting your itinerary...');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split('\n').filter((l) => l.startsWith('data: '));
        for (const line of lines) {
          try {
            const data = JSON.parse(line.replace('data: ', ''));
            if (data.done) {
              tripId = data.tripId;
              cached = data.cached;
            }
            if (data.error) throw new Error(data.error);
          } catch {}
        }
      }

      if (tripId) {
        if (cached) toast.success('Found a matching trip in your history!');
        else toast.success('Trip generated!');
        navigate('/view-trip/' + tripId);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to generate trip.');
    } finally {
      setLoading(false);
      setStreamStatus('');
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mb-10">
      <div className="mb-10">
        <h2 className="font-extrabold text-3xl md:text-4xl flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" /> Plan Your Trip
        </h2>
        <p className="mt-2 text-muted-foreground text-lg">
          Tell us your preferences and our AI builds a personalized itinerary for you.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Destination */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Where do you want to go?</h2>
          <MapboxAutocomplete onchange={(result) => handleInputChange('location', result.place_name)} />
        </div>

        {/* Duration */}
        <div>
          <h2 className="text-xl font-semibold mb-3">How many days? <span className="text-muted-foreground text-sm font-normal">(1–10)</span></h2>
          <Input
            placeholder="e.g. 5"
            type="number"
            min={1}
            max={10}
            className="max-w-xs"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl font-semibold mb-3">What's your budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-5 border-2 cursor-pointer rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  formData?.budget === item.title
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border'
                }`}
              >
                <h2 className="text-3xl mb-2">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-muted-foreground">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Traveler type */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Who's travelling?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-5 border-2 cursor-pointer rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  formData?.traveler === item.people
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border'
                }`}
              >
                <h2 className="text-3xl mb-2">{item.icon}</h2>
                <h2 className="font-bold">{item.title}</h2>
                <h2 className="text-sm text-muted-foreground">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <div className="flex flex-col items-end gap-2 my-5">
          {loading && streamStatus && (
            <p className="text-sm text-muted-foreground animate-pulse">{streamStatus}</p>
          )}
          <Button onClick={onGenerateTrip} disabled={loading} size="lg" className="px-8 gap-2">
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate My Trip
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Login dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogDescription>
              <img src="/logoipsum-339.svg" className="h-8 mb-6" alt="Logo" />
              <h2 className="font-bold text-lg text-foreground mb-1">Sign in to continue</h2>
              <p className="text-muted-foreground text-sm mb-5">Create and save your AI-generated trip plans</p>
              <Button onClick={googleLogin} className="w-full flex gap-3 items-center">
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CreateTrip;
export { MapboxAutocomplete };
