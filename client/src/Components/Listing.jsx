import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import ContactLandlower from "./ContactLandlower";




import { updatecurrentuser, updateactive } from '../redux/userredux';
import { useDispatch } from "react-redux";




// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./listingslider.css";


function Listing() {
  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  const [copied,setcopied]=useState(false)

  const dispach=useDispatch();
  useEffect(()=>{
    dispach(updateactive(""))
  })
  SwiperCore.use([Navigation, Pagination]); // Include Pagination here
  const { currentuser } = useSelector(state => state.user);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState({});
  const [listingErr, setListingErr] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/listining/get/${id}`)
      .then((res) => {
        if (res.data.findlisting) {
    
          setLoading(false);
          setListing(res.data.listing);
        } else {
          console.log("No listing found");
          setLoading(false);
          setListingErr("No listing found");
        }
      })
      .catch((err) => {
        console.log("Error fetching listing:", err);
        setLoading(false);
        setListingErr("Something went wrong");
      });
  }, [id]); // Ensure useEffect has `id` as dependency
  const [textareacondition,settextareacondition]=useState(false)

  return (
  
    <div className="relative">
    <div className="flex justify-center items-center gap-2">
      <div className="fixed top-24 md:right-10 right-5 text-white text-[20px] md:text-[30px] z-30 bg-blue-700 cursor-pointer hover:bg-blue-900 rounded-full duration-500" onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setcopied(true)
        setTimeout(() => {
          setcopied(false)
        }, 2000);
      }}>
       
        <i className="fa-solid fa-share p-4 "></i>
      </div>
      <div className={`fixed top-44 z-30 right-10 bg-white text-blue-700 p-2 rounded-2xl text-[16px] ${copied===false && "hidden" }`}>Link copied!</div>
      
      {loading && (
        <div className="mt-11 font-bold text-[30px] text-blue-700">
          Loading...
        </div>
      )}
      {listingErr && (
        <div className="mt-11 font-bold text-[30px] text-blue-700">
          {listingErr}
        </div>
      )}
      {!loading && !listingErr && (
        <div className="w-full">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {listing.imageurls &&
              listing.imageurls.map((url, index) => (
                <SwiperSlide key={index} className="w-full h-[30vh]">
                  <img
                    src={url}
                    alt={`Listing ${index}`}
                    className="w-full md:h-[70vh] object-cover"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
  
          <div className="p-3 md:pl-64 mt-10">
            <div className="flex gap-5 flex-col">
              <h1 className="font-bold text-[25px] md:text-[30px]">
                {listing.name} - ${listing.price}{" "}
                {listing.type === "rent" && "/ month"}
              </h1>
              <div className="gap-4 flex flex-col">
                <div className="flex gap-2 items-center">
                  <i className="fa-solid fa-location-dot text-blue-700 text-[20px]"></i>
                  <h1 className="text-slate-700 mb-1">{listing.location}</h1>
                </div>
                <div className="flex gap-3">
                  <div className="bg-red-800 p-1 w-[160px] text-white flex justify-center rounded-xl">
                    For {listing.type}
                  </div>
                  <div className="bg-blue-700 p-1 w-[160px] text-white flex justify-center rounded-xl">
                    Discount - {listing.discount}$
                  </div>
                </div>
  
                <div className="md:w-[70%] w-full text-slate-700 p-4">
                  <p className="text-slate-800 break-words">
                    <span className="font-semibold text-black">
                      Description&nbsp;:&nbsp;
                    </span>
                    {listing.description}
                  </p>
                </div>
  
                <div className="flex items-center gap-8 flex-wrap">
                  <div className="text-red-800 flex gap-2 items-center">
                    <i className="fa-solid fa-bath"></i>
                    <span>{listing.bath} Baths</span>
                  </div>
                  <div className="text-red-800 flex gap-2 items-center">
                    <i className="fa-solid fa-bed"></i>
                    <span>{listing.bed} Beds</span>
                  </div>
                  <div className="text-red-800 flex gap-2 items-center">
                    <i className="fa-solid fa-square-parking"></i>
                    <span>{listing.parking} Parking</span>
                  </div>
                  <div className="text-red-800 flex gap-2 items-center">
                    <i className="fa-solid fa-chair"></i>
                    <span>
                      {listing.furnish ? "Furnished" : "Not furnished"}
                    </span>
                  </div>
                </div>
  
                <div className="flex justify-center md:pr-64 flex-col items-center">
                  {textareacondition && (
                    <ContactLandlower listing={listing}></ContactLandlower>
                  )}
                  {textareacondition && (
                    <button
                      className="hover:bg-red-950 duration-700 bg-red-800 w-[340px] md:w-[450px] p-2 mt-4 text-white text-[18px] rounded-md"
                      onClick={() => {
                        settextareacondition(!textareacondition);
                      }}
                    >
                      Close
                    </button>
                  )}
                  {listing.userref != currentuser._id && !textareacondition && (
                    <button
                      onClick={() => {
                        settextareacondition(!textareacondition);
                      }}
                      className="hover:bg-blue-950 duration-700 bg-blue-700 w-[340px] md:w-[450px] p-2 mt-4 text-white text-[18px] rounded-md"
                    >
                      Contact Landlord
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
}

export default Listing;
