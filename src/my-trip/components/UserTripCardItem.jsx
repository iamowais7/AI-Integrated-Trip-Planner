import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MAPBOX_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const UNSPLASH_BASE_URL = "https://api.unsplash.com/search/photos";

function UserTripCardItem({trip}) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip?.userSelection?.location) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const location = trip?.userSelection?.location;
      if (!location) return;
  
      console.log("Searching place in Mapbox:", location);
  
      // Fetch place details from Mapbox
      const mapboxResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`,
        {
          params: {
            access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN, // Store API Key in .env
            limit: 1,
          },
        }
      );
  
      console.log("Mapbox Response:", mapboxResponse.data);
  
      if (!mapboxResponse.data.features.length) {
        console.error("No place found in Mapbox.");
        return;
      }
  
      // Fetch image from Unsplash
      console.log("Searching image in Unsplash for:", location);
      const unsplashResponse = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
          query: location,
          per_page: 1,
          orientation: "landscape",
        },
      });
  
      console.log("Unsplash Response:", unsplashResponse.data);
  
      if (!unsplashResponse.data.results.length) {
        console.error("No images found on Unsplash.");
        return;
      }
  
      const imageUrl = unsplashResponse.data.results[0].urls.regular;
      console.log("Final Image URL:", imageUrl);
      setPhotoUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching place image:", error);
    }
  };

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl} className='object-cover rounded-xl h-[200px]'  />
        <div>
          <h2 className='flex align-middle font-bold text-lg'>
            {trip?.userSelection?.location}
          </h2>
          <h2 className='flex align-middle text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days Trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem