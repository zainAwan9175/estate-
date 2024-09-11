import React from 'react';
import "./signup.css"
import pic from "../assest/Signout.jpg";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updatecurrentuser,updateactive } from '../redux/userredux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Auth from './Auth';
import { useEffect } from 'react';

function Signin() {
  const dispach=useDispatch();
  useEffect(()=>{
dispach(updateactive("signin"))
  },[])
  let{currentuser,active}=useSelector(state=>state.user)

  
  const navigate=useNavigate();
  const[username,setusername]=useState("")
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[msg,setmsg]=useState("")
  axios.defaults.withCredentials = true;
  function handlesubmit(e)
  {
    e.preventDefault();

  axios.post("https://real-estate-full-stack-rose.vercel.app//auth/signin",{email,password})
  .then((res)=>{
    if(res.data.signin)
    {
      dispach(updatecurrentuser(res.data.newuser))

      setmsg("login successflly");
      navigate("/")
      
    }
    else{
      setmsg("email or password incorrect");
    }
     
  })
  .catch((err)=>{
   setmsg("something went wrong");
  })


  }

  return (
    <div 
    className='h-[91vh]   flex justify-center items-center bg-cover bg-center z-0 ' 
      style={{ 
        backgroundImage: `url(https://static.rdc.moveaws.com/images/hero/default/2021-11/jpg/hp-hero-desktop.jpg)`, 
        backgroundSize: 'cover',  // Scales the image to cover the entire container
        backgroundPosition: 'center',  // Centers the image in the container
        backgroundRepeat: 'no-repeat',
                                        // Ensures the image does not repeat
      }} 
    >
      <form onSubmit={handlesubmit} className='bg-gradient-to-b border-white  border-2 backdrop-blur-custom bg-slate-200 bg-opacity-10 backdrop-blur-md   shadow-2xl w-[340px] md:w-[400px] rounded-2xl flex justify-center items-center flex-col p-6 gap-5'>
        <h1 className='text-white font-bold md:text-[30px] text-[22px]'>Sign In</h1>
        <div className='flex justify-center items-center flex-col gap-5 w-full'>
         
          <input className='p-2 shadow-2xl rounded-md outline-none w-[100%] opacity-70' placeholder='Email' type='text' onChange={(e)=>{setemail(e.target.value)}} required/>
          <input className='p-2 shadow-2xl rounded-md outline-none w-[100%] opacity-70' placeholder='Password' type='password' onChange={(e)=>{setpassword(e.target.value)}} required/>
          <div className='w-full gap-3 flex flex-col'>
            <button type='submit' className=' p-2   shadow-2xl hover:bg-blue-900 duration-300 bg-blue-600 text-white mt-4 rounded-md outline-none w-[100%]'>SIGN IN</button>
        <Auth></Auth>
          </div>
          <div className='w-full'>
            <p className='  text-white'>Dont Have an account? &nbsp;<Link to="/signup"><button className='text-blue-600 font-bold '>Sign Up</button></Link>   </p>
            <p className='text-red-600 h-[25px]'>{msg}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signin;
