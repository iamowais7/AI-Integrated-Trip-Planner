import  { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { FaRobot } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";

function Header() {
  
  const[openDialog,setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    console.log(user)
  },[])

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>getUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })  

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
      window.location.reload()
    })
   
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <img src="/logoipsum-339.svg" />
        <div>
          {
            user?
            <div className='flex items-center gap-3'>
              <a href="/create-trip">
              <Button varient='outline' classname='rounded-full'>+ Create Trip</Button>  
              </a>
              <a href="/my-trips">
              <Button varient='outline' classname='rounded-full'>My Trips</Button>  
              </a>
              <a href="/help">
              <Button varient='outline' classname='rounded-full'>Help Line <MdOutlinePhone /></Button>  
              </a>
              <a href="/chat">
              <Button varient='outline' classname='rounded-full'>Support<FaRobot /></Button>  
              </a>
              <a href="/faqs">
              <Button varient='outline' classname='rounded-full'>FAQs</Button>  
              </a>
              <Popover>
                  <PopoverTrigger>{user?.picture && <img src={user.picture} className="h-[35px] w-[35px] rounded-full" alt="User Profile" />}</PopoverTrigger>
                  <PopoverContent>
                    <h2 className='cursor-pointer' onClick={()=>{
                      googleLogout();
                      localStorage.clear()
                      window.location.reload()
                    }}>Logout</h2>
                  </PopoverContent>
                 </Popover>
            </div>
            :<Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
          }  
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

    </div>
  )
}

export default Header