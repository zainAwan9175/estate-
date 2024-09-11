import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updatecurrentuser, updateactive } from "../redux/userredux";
import Cards from "./Cards";

function Search() {
  const navigate = useNavigate();
  const { active, currentuser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading,setloading]=useState(false);
  const[search,setsearch]=useState(false)
  const[showmore,setshowmore]=useState(false)
 
  const [listings,setlistings]=useState([])

  useEffect(() => {
    dispatch(updateactive(""));
  }, [dispatch]);

  const [sidebardata, setsidebardata] = useState({
    type: "all",
    offer: false,
    furnish: false,
    parking: false,
    sort: "createdAt",
    order: "desc",
    searchTerm: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const furnishFromUrl = urlParams.get("furnish");
    const parkingFromUrl = urlParams.get("parking");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
  
    setsidebardata({
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      offer: offerFromUrl === "true",
      furnish: furnishFromUrl === "true",
      parking: parkingFromUrl === "true",
      sort: sortFromUrl || "createdAt",
      order: orderFromUrl || "desc",
    });
  
    async function sendToBackend() {
      setshowmore(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/listining/search?${urlParams.toString()}`
        );
  
        if (response.data.found) {
            setlistings(response.data.listings)
          setshowmore(response.data.listings);
         // Log the length of the array
  
          if (response.data.listings.length > 8) {
            setshowmore(true);
          } else {
            setshowmore(false);
          }
        } else {
          setshowmore(false);
        }
      } catch (error) {
        console.error("Error occured during Axios request:", error.message);
      } finally {
        setloading(false);
      }
    }
  
    sendToBackend();
  }, [window.location.search]);
  

  // function handleSearch(e) {
  //   const { id, value, checked } = e.target;

  //   if (id === "all" || id === "sale" || id === "rent") {
  //     setsidebardata((prevState) => ({ ...prevState, type: id }));
  //   }

  //   if (id === "offer" || id === "furnish" || id === "parking") {
  //     setsidebardata((prevState) => ({
  //       ...prevState,
  //       [id]: checked,
  //     }));
  //   }

  //   if (id === "search-navbar") {
  //     setsidebardata((prevState) => ({ ...prevState, searchTerm: value }));
  //   }

  //   if (id === "sort_order") {
  //     const [sort, order] = value.split("_");
  //     setsidebardata((prevState) => ({
  //       ...prevState,
  //       sort: sort || "createdAt",
  //       order: order || "desc",
  //     }));
  //   }
  // }


  function handleSearch(e) {
    const { id, value, checked } = e.target;
  
    if (id === "all" || id === "sale" || id === "rent") {
      setsidebardata((prevState) => ({ ...prevState, type: id }));
    }
  
    if (id === "offer" || id === "furnish" || id === "parking") {
      setsidebardata((prevState) => ({
        ...prevState,
        [id]: checked,
      }));
    }
  
    if (id === "search-navbar") {
      setsidebardata((prevState) => ({ ...prevState, searchTerm: value }));
    }
  
    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setsidebardata((prevState) => ({
        ...prevState,
        sort: sort || "createdAt",
        order: order || "desc",
      }));
    }
  }
  

  function handleSubmit(e) {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("offer", sidebardata.offer ? "true" : "false");
    urlParams.set("furnish", sidebardata.furnish ? "true" : "false");
    urlParams.set("parking", sidebardata.parking ? "true" : "false");
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    navigate(`/search?${urlParams.toString()}`);

  
  }

  function showmorelisting() {
    const urlParams = new URLSearchParams(window.location.search);
    const startIndex = listings.length;
    urlParams.set("startIndex", startIndex);
    const searchquery = urlParams.toString();

    async function sendToBackend() {
        setloading(true);

        try {
            const response = await axios.get(
                `http://localhost:3001/listining/search?${searchquery}`
            );

            if (response.data.found && response.data.listings) {
                const newlistings = response.data.listings;
            console.log(newlistings)
                // Combine old listings with new ones
                const updatedListings = [...listings, ...newlistings];
                
                // Update listings state
                setlistings(updatedListings);

                // Check if there are more listings to load
                if (newlistings.length > 8 ) {
                    setshowmore(true);  // Show "Show More" button if there are more listings available
                } else {
                    setshowmore(false); // Hide "Show More" button if all listings are loaded
                }

                setloading(false);
            } else {
                setshowmore(false); // Hide "Show More" if no new listings are found
                setloading(false);
            }
        } catch (error) {
            console.error("Error during Axios request:", error);
            setloading(false);
        }
    }

    sendToBackend();
}

  return (
    <div className="flex flex-col md:flex-row">
      <form onSubmit={handleSubmit}>
        <div className="md:h-full  text-[18px] text-slate-500 border-b-[3px] border-slate-300 md:border-b-0 md:border-r-[3px] p-5 w-[100vw] md:w-[30vw] flex flex-col gap-8 pt-16">
          <div className="flex justify-center items-center gap-1">
            <label>Search&nbsp;Term:</label>
            <input
              type="text"
              name="search"
              id="search-navbar"
              className="block p-2 w-[240px] md:w-full text-sm outline-none text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
              placeholder="Search..."
              onChange={handleSearch}
              value={sidebardata.searchTerm}
            />
          </div>

          <div className="items-center gap-6 flex-wrap flex">
            <div className="flex gap-2 text-[18px] text-slate-500">
              <label>Type:</label>
              <input
                type="checkbox"
                className="w-5"
                id="all"
                onChange={handleSearch}
                checked={sidebardata.type === "all"}
              ></input>
              <label>Rent & Sale</label>
            </div>

            <div className="flex gap-2 text-[18px] text-slate-500">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleSearch}
                checked={sidebardata.type === "rent"}
              ></input>
              <label>Rent</label>
            </div>
            

            <div className="flex gap-2 text-[18px] text-slate-500">
            <input
  type="checkbox"
  className="w-5"
  id="sale"
  onChange={handleSearch}
  checked={sidebardata.type === "sale"}
></input>
<label>Sale</label>

            </div>

            <div className="flex gap-2 text-[18px] text-slate-500">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                onChange={handleSearch}
                checked={sidebardata.offer}
              ></input>
              <label>Offer</label>
            </div>
          </div>

          <div className="items-center gap-6 flex-wrap flex">
            <div className="flex gap-2 text-[18px] text-slate-500">
              <label>Amenities:</label>
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                onChange={handleSearch}
                checked={sidebardata.parking}
              ></input>
              <label>Parking</label>
            </div>

            <div className="flex gap-2 text-[18px] text-slate-500">
              <input
                type="checkbox"
                className="w-5"
                id="furnish"
                onChange={handleSearch}
                checked={sidebardata.furnish}
              ></input>
              <label>Furnish</label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[18px] text-slate-500">Sort By:</label>
            <select
              className="p-2"
              id="sort_order"
              onChange={handleSearch}
              value={`${sidebardata.sort}_${sidebardata.order}`}
            >
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="price_desc">Price High to Low</option>
              <option value="price_asc">Price Low to High</option>
            </select>
          </div>

          <button
            type="submit"
            className="p-2 w-full bg-blue-500 text-white rounded-md"
          >
            Search
          </button>
        </div>
      </form>

      <div className="w-[100vw] md:w-[70vw] ">
        <div className="border-b-2 w-[100%] border-slate-300 p-6   text-[25px] md:text-[30px] font-bold text-slate-400">
          Listing results:
        </div>

        <div className="flex flex-col gap-4">
           <div className="flex justify-center items-center   font-semibold text-[30px]">
           {
                loading&&(
                   <h1 className="text-blue-700">LOading...</h1>
                )
            }

            {
                listings.length==0 &&(
                    <h1 className="text-red-700">No Listing found</h1>
                )
            }
            </div>

            <div className="flex justify-center items-center gap-6 flex-wrap">
                {
                    listings.length>0 && listings.map((listing)=>{
                    return(    <Cards key={listing._id} listing={listing}></Cards>)

                    })
                   
                }

            </div>
            <div className={`${showmore ? "visible" :"invisible"  } flex justify-center text-blue-700 font-bold text-[25px] mt-10`}>
                <button onClick={showmorelisting}>Showmore</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
