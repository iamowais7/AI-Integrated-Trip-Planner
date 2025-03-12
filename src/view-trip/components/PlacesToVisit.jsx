import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg flex justify-start'>Places To Visit</h2>

        <div>
        {trip?.tripData?.itinerary ?
            Object.keys(trip.tripData.itinerary)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))    
            .map((dayKey, index) => {
                const dayData = trip.tripData.itinerary[dayKey]; // Get the data for the day
                return (
                    <div key={index} >
                        
                        <h2 className='font-md text-lg flex justify-start'>{dayKey}</h2> 
                        <div className='grid grid-cols-2 gap-5'>
                        {dayData.places?.map((place, i) => (
                            <div key={i} className='mt-5'>
                                <h2 className='font-medium text-sm text-orange-600 flex justify-start'>{place.timeTravel}</h2>
                                {/* <h2 className="font-bold">{place.placeName}</h2>   */}
                                <PlaceCardItem place={place}/>
                            </div>
                        ))}
                        </div>
                    </div>
                );
            }):[1,2,3,4,5,6].map((index,key)=>(
                <div key={index} className='h-[130px] w-full bg-slate-200 animate-pulse rounded-xl'>
      
                </div>
              ))
        }
        </div>
    </div>
  )
}

export default PlacesToVisit