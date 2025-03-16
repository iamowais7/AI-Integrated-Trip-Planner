import  { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions , SelectTravelList} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {AI_PROMPT} from '@/constants/options'
import { chatSession } from "@/service/AIMODEL";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "@/view-trip/components/Footer";


const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapboxAutocomplete = ({ onchange }) => {
  const geocoderContainer = useRef(null);
  const geocoderRef = useRef(null); // Store the geocoder instance

  useEffect(() => {
    if (!geocoderContainer.current) return;

    geocoderRef.current = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      types: "place",
      placeholder: "Search for places...",
      marker: false,
    });

    geocoderRef.current.addTo(geocoderContainer.current);

    geocoderRef.current.on("result", (event) => {
      if (onchange) {onchange(event.result);}

      const inputField = geocoderContainer.current.querySelector("input");
      if (inputField) {
        inputField.value = event.result.place_name;
      }
    });

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.onRemove(); // Proper cleanup method
        geocoderRef.current = null;
      }
    };
  }, [onchange]);

  return <div ref={geocoderContainer} />;
};

MapboxAutocomplete.propTypes = {
  onchange: PropTypes.func.isRequired,
};

const CreateTrip = () => {
  
  const[formData,setFormData] = useState([]);
  const[openDialog,setOpenDialog] = useState(false);
  const[loading,setLoading] = useState(false)

  const navigate = useNavigate();

const handleInputChange=(name,value)=> {
  setFormData({
    ...formData,
    [name]: value,
  })
};

useEffect(()=>{
  console.log(formData);
},[formData])

const login = useGoogleLogin({
  onSuccess:(codeResp)=>getUserProfile(codeResp),
  onError:(error)=>console.log(error)
})

const onGenerateTrip=async ()=>{
  const user = localStorage.getItem('user');

  if(!user){
    setOpenDialog(true)
    return;
  }

  if(formData?.noOfDays>5 && !formData?.location || !formData?.budget || !formData?.traveler){
    toast("Plz fill all details.")
    return;
  }

  setLoading(true)
  
  const FINAL_PROMPT = AI_PROMPT
  .replace('{location}',formData?.location)
  .replace('{totalDays}',formData?.noOfDays)
  .replace('{traveler}',formData?.traveler)
  .replace('{budget}',formData?.budget)

  const result = await chatSession.sendMessage(FINAL_PROMPT);
  console.log(result?.response?.text());
  setLoading(false)
  SaveAiTrip(result?.response?.text());
};

const SaveAiTrip = async (TripData) => {
  setLoading(true);
  const docID = Date.now().toString();
  const user = JSON.parse(localStorage.getItem("user"));

  let parsedTripData;
  try {
    parsedTripData = JSON.parse(TripData);
  } catch (error) {
    console.error("JSON Parsing Error:", error, "TripData:", TripData);
    toast("Error processing trip data. Please try again.");
    setLoading(false);
    return;
  }

  await setDoc(doc(db, "AITrips", docID), {
    userSelection: formData,
    tripData: parsedTripData,
    userEmail: user?.email,
    id: docID,
  });

  setLoading(false);
  navigate("/view-trip/" + docID);
};


const getUserProfile = (tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token }`,{
    headers:{
      Authorization:`Bearer ${tokenInfo?.access_token}`,
      Accept:'Application/json'
    }
  }).then((resp)=>{
    console.log(resp)
    localStorage.setItem('user',JSON.stringify(resp.data));
    setOpenDialog(false)
    onGenerateTrip();
  })
 
}

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium flex justify-start">
            What is your destination of choice?
          </h2>
          <MapboxAutocomplete onchange={(result) => handleInputChange('location',result.place_name)} />
        </div>
      </div>

      <div className=" mt-3 flex flex-col gap-3">
      <h2 className="text-xl my-3 font-medium flex justify-start">
            How many days are you planning your trip?</h2>
            <Input placeholder={'Ex.3'} type="number" className="w-full max-w-sm p-2 border rounded-md" 
                  onChange ={(e)=>handleInputChange('noOfDays',e.target.value)}/>
      </div>

      <div>
      <h2 className="text-xl my-3 font-medium flex justify-start">
            What is your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index} 
            onClick={()=>handleInputChange('budget',item.title)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                          ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
          </div>    
      </div>

      <div>
      <h2 className="text-xl my-3 font-medium flex justify-start">
            Who do you plan on travelling with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('traveler',item.people)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                          ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
          </div>    
      </div>

        <div className="my-10 flex justify-end">
          <Button onClick={onGenerateTrip} disabled={loading}>
            {
              loading?<AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/>:'Generate Trip'

            }
            </Button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent>
    <DialogHeader>
      <button
        className="absolute right-3 top-3"
        onClick={() => setOpenDialog(false)}
      >
        ✖
      </button>
      <DialogDescription>
        <img src="/logoipsum-339.svg" alt="Logo" />
        <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
        <p>Sign in to the App with Google authentication securely</p>
        <Button
          onClick={login}
          className="w-full mt-5 flex gap-4 items-center"
        >
          <FcGoogle className="h-8 w-8" />
          Sign In With Google
        </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


      <Footer/>
    </div>
  )
}

export default CreateTrip;
export { MapboxAutocomplete };
