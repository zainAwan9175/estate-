import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateactive } from '../redux/userredux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const[message,setmessage]=useState("")
  const { active } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateactive("about"));
  }, [dispatch]);

  return (
    <div className='flex justify-center items-center flex-col gap-10'>
      <div className='pt-10 pl-10 pr-10 text-center md:pt-48  md:pl-48 md:pr-48 text-[17px] text-slate-500'>
        <span className='text-blue-500 text-[2rem] font-bold md:text-[3rem]'>
          About Zain Estate
        </span>
        <br />
        <br />
        Zain Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
        <br /><br />
        Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
        <br /><br />
        Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
      </div>

      <div className='flex flex-col gap-4 justify-center  items-center'>
           

           <textarea value={message} onChange={(e)=>{setmessage(e.target.value)}} className="w-[340px] md:w-[450px] p-2 mt-4 rounded-md" placeholder="Enter your message"></textarea>
           <Link to={`mailto:kopak15210@daypey.com?subject=Regarding:Real Estate &body=${message}` } ><button className="hover:bg-blue-950 duration-700 bg-blue-700 w-[340px] md:w-[450px] p-2 mt-4 text-white text-[18px] rounded-md">send message</button></Link>
           
       </div>
      <div className="w-full flex justify-center">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d118692.6356388116!2d74.22368346940307!3d31.51915246251006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1suniersity%20of%20education!5e0!3m2!1sen!2s!4v1724748374110!5m2!1sen!2s" 
          width="80%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      
      </div>
    </div>
  );
}

export default About;
