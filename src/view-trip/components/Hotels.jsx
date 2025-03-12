import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
        <div>
        <h2 className='font-bold text-xl mt-5 flex justify-start'>Hotel Recommendation</h2>

        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
            {trip?.tripData?.hotels?.map((hotel,index)=>(
               <HotelCardItem hotel={hotel} key={index}/>
            ))}
        </div>
    </div>
    </div>
  )
}

export default Hotels