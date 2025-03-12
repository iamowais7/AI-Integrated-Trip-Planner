import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaMapLocation } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const MAPBOX_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const UNSPLASH_BASE_URL = "https://api.unsplash.com/search/photos";

function PlaceCardItem({place}) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const location = place?.placeName;
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
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl} className='w-[130px] h-[130px] rounded-lg object-cover'/>

        <div>
            <h2 className='font-bold text-lg'>{place?.placeName}</h2>
            <p className='text-sm text-gray-400'>{place?.placeDetails}</p>
            {/* <p>{place?.timeTravel}</p> */}
            <Button size="sm"><FaMapLocation /></Button>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem