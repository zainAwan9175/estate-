import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Hero from './Hero';
import Homeslider from './Homeslider';
import REcentoffer from './REcentoffer';
import { updateactive } from '../redux/userredux';
import Recentsell from './Recentsell';
import Recentrent from './Recentrent';

function Home() {
  const [offer, setOffer] = useState([]);
  const [sell, setSell] = useState([]);
  const [rent, setRent] = useState([]);


  const { active } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateactive("home"));
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/listining/search?offer=true&limit=4`);

        if (response.data.found) {
          setOffer(response.data.listings);
       
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await axios.get(`http://localhost:3001/listining/search?type=sale&limit=4`);

        if (response.data.found) {
          setSell(response.data.listings);
     
    
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await axios.get(`http://localhost:3001/listining/search?type=rent&limit=4`);

        if (response.data.found) {
          setRent(response.data.listings);
  
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='flex flex-col  justify-center items-center  w-full overflow-x-hidden'>
    <Hero />
    <Homeslider offer={offer} />
    <REcentoffer offer={offer} />
    <Recentsell sell={sell} />
    <Recentrent rent={rent} />
  </div>
  );
}

export default Home;
