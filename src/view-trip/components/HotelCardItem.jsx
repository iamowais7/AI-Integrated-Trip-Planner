import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MAPBOX_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const UNSPLASH_BASE_URL = "https://api.unsplash.com/search/photos";


function HotelCardItem({hotel}) {

    const [photoUrl, setPhotoUrl] = useState();
    
      useEffect(() => {
        if (hotel?.hotelName) {
          GetPlacePhoto();
        }
      }, [hotel]);
    
      const GetPlacePhoto = async () => {
        try {
          const location = hotel?.hotelName;
          if (!location) return;
      
        //   console.log("Searching place in Mapbox:", location);
      
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
      
        //   console.log("Mapbox Response:", mapboxResponse.data);
      
          if (!mapboxResponse.data.features.length) {
            console.error("No place found in Mapbox.");
            return;
          }
      
          // Fetch image from Unsplash
        //   console.log("Searching image in Unsplash for:", location);
          const unsplashResponse = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
              client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
              query: location,
              per_page: 1,
              orientation: "landscape",
            },
          });
      
        //   console.log("Unsplash Response:", unsplashResponse.data);
      
          if (!unsplashResponse.data.results.length) {
            console.error("No images found on Unsplash.");
            return;
          }
      
          const imageUrl = unsplashResponse.data.results[0].urls.regular;
        //   console.log("Final Image URL:", imageUrl);
          setPhotoUrl(imageUrl);
        } catch (error) {
          console.error("Error fetching place image:", error);
        }
      };

  return (
    <div>
         <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+ hotel?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={photoUrl} className='rounded-xl h-[180px] w-full object-cover'/>
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                        <h2 className='text-sm'>💰 {hotel?.price}</h2>
                        <h2 className='text-sm'>⭐ {hotel?.rating}</h2>

                    </div>
                </div>
                </Link>
    </div>
  )
}

export default HotelCardItem