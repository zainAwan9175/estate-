import React from 'react';
import "./signup.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updatecurrentuser, updateactive } from '../redux/userredux';
import Auth from './Auth';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentuser, active } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(updateactive("signup"));
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  
  }, []);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [p_lmsg, setp_lmsg] = useState("");
  const [msg, setmsg] = useState("");

  axios.defaults.withCredentials = true;

  function handlesubmit(e) {
    e.preventDefault();
    if (password.length < 8) {
      setp_lmsg("password at least 8 characters");
    } else {
      setp_lmsg("");
      axios.post("http://estate-liard.vercel.app/auth/signup", { username, email, password }, { withCredentials: true })
        .then((res) => {
          if (res.data.register) {
            dispatch(updatecurrentuser(res.data.newuser));
            setmsg("account created successfully");
            console.log("hi")
            console.log(res.data.kok)
            navigate("/");
          } else {
            setmsg("email or username already registered");
          }
        })
        .catch(() => {
          setmsg("something went wrong");
        });
    }
  }

  return (
    <div 
      className='h-[91vh] flex justify-center items-center bg-cover bg-center z-0' 
      style={{ 
        backgroundImage: `url(https://static.rdc.moveaws.com/images/hero/default/2021-11/jpg/hp-hero-desktop.jpg)`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
      }}
    >
      <form onSubmit={handlesubmit} className='bg-gradient-to-b border-white border-2 backdrop-blur-custom bg-slate-200 bg-opacity-10 backdrop-blur-md shadow-2xl w-[340px] md:w-[400px] rounded-2xl flex justify-center items-center flex-col p-6 gap-5'>
        <h1 className='text-white font-bold md:text-[30px] text-[22px]'>Sign Up</h1>
        <div className='flex justify-center items-center flex-col gap-5 w-full'>
          <input className="p-2 shadow-2xl rounded-md outline-none w-[100%] opacity-70" placeholder='Username' type='text' onChange={(e) => setusername(e.target.value)} required/>
          <input className='p-2 shadow-2xl rounded-md outline-none w-[100%] opacity-70' placeholder='Email' type='email' onChange={(e) => setemail(e.target.value)} required/>
          <div className='text-red-700 font-bold w-full'>
            <p>{p_lmsg}</p>
            <input className={`text-black p-2 shadow-2xl rounded-md outline-none w-[100%] opacity-70 ${p_lmsg ? "border-2 border-red-600" : ""}`} placeholder='Password' type='password' onChange={(e) => setpassword(e.target.value)} required/>
          </div>
          <div className='w-full gap-3 flex flex-col'>
            <button type='submit' className='p-2 shadow-2xl hover:bg-blue-900 duration-300 bg-blue-600 text-white mt-4 rounded-md outline-none w-[100%]'>SIGN UP</button>
            <Auth />
          </div>
          <div className='w-full'>
            <p className='text-white'>Have an account? &nbsp;<Link to="/signin"><button className='text-blue-600 font-bold'>Sign in</button></Link></p>
            <p className='text-red-600 font-bold'>{msg}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
