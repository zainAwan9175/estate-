import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './listingslider.css';

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

export default function Homeslider({ offer }) {
  return (
    <>
      <div className="text-center">
        <h1 className=' mt-10 md:mt-24  xl:mt-32 text-[24px] md:text-[3rem] font-bold text-slate-500'>Explore Destinations</h1>
        <div className='mx-auto mt-4 mb-12 h-1.5  md:h-2 rounded-md shadow-2xl w-[200px] bg-blue-500'></div> {/* Blue line centered below the heading */}
      </div>
      
      <Swiper
        cssMode={true}
        navigation={true} // Enables arrow navigation
        pagination={{ clickable: true }}  // Ensures the pagination dots are clickable
        mousewheel={true}
        keyboard={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}  // Enables autoplay functionality
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper h-[80vh]"
      >
        {offer.map((listing) => (
          <SwiperSlide key={listing.id}>
            <img src={listing.imageurls[0]} className="w-[100vw] h-[30vh] md:h-[75vh]" alt="listing" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
