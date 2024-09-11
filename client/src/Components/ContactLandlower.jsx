import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ContactLandlower({ listing }) {
    const [listingowner, setlistingowner] = useState({});
    const[message,setmessage]=useState("")

    useEffect(() => {
        axios
            .get(`http://localhost:3001/auth/get/${listing.userref}`)
            .then((res) => {
                console.log(res.data.listingowner); // Logs the correct data from the response
                setlistingowner(res.data.listingowner);
            })
            .catch((err) => {
                console.error('Error fetching listing owner:', err);
            });
    }, [listing.userref]); // Add listing.userref as a dependency

    useEffect(() => {
        console.log(listingowner); // This will log after listingowner has been updated
    }, [listingowner]); // This useEffect will run every time listingowner changes

    return (
        <div className='flex flex-col gap-4 justify-center  items-center'>
            {/* Optionally render listingowner.username if it's available */}
            {listingowner.username && <p className='text-[18px] mt-4'>contact: <span className='font-semibold'>{listingowner.username} </span> for <span className='font-semibold'>{listing.name}</span></p>}
            <textarea value={message} onChange={(e)=>{setmessage(e.target.value)}} className="w-[340px] md:w-[450px] p-2 mt-4 rounded-md" placeholder="Enter your message"></textarea>
            <Link to={`mailto:${listingowner.email}?subject=Regarding: ${ listing.name}&body=${message}` } ><button className="hover:bg-blue-950 duration-700 bg-blue-700 w-[340px] md:w-[450px] p-2 mt-4 text-white text-[18px] rounded-md">send message</button></Link>
            
        </div>
    );
}

export default ContactLandlower;
