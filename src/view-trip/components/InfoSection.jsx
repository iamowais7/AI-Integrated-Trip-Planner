import { Button } from '@/components/ui/button'
import { GetPlaceImage } from '@/service/GlobalApi';
import axios from 'axios';
import { Query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { IoIosShareAlt } from "react-icons/io";


const MAPBOX_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const UNSPLASH_BASE_URL = "https://api.unsplash.com/search/photos";


function InfoSection({trip}) {
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
    <div>
        <img src={photoUrl} className='h-[340px] w-full object-cover rounded'/>

       <div className='flex justify-between items-center'>
       <div className='my-5 flex flex-col gap-2'>
            <h2 className='flex flex-initial font-bold text-2xl'>{trip?.userSelection?.location}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. of Traveler: {trip?.userSelection?.traveler}</h2>
                
            </div>
        </div>
           <Button><IoIosShareAlt /></Button>
       </div>
    </div>
  )
}

export default InfoSection
