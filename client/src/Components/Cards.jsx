import React from "react";
import { Link } from "react-router-dom";

function Cards({ listing }) {
  return (
    <Link to={`/listing/${listing._id}`}>
    <div className="w-[340px] rounded-xl shadow-2xl bg-white">
      <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
        <img
          alt=""
          src={listing.imageurls[0]}
          className="h-56 w-full rounded-md object-cover  transition-transform duration-300 hover:scale-110"
        />

        <div className="mt-2 flex flex-col gap-2 justify-center">
          <dl>
            <div>
              <dt className="sr-only">name</dt>
              <dd className="text-[17px] font-semibold truncate md:break-words">{listing.name}</dd>
            </div>

            <div>
              <dt className="sr-only">Address</dt>

              <dd className="font-medium gap-2 flex items-center text-[13px] text-slate-500 mt-3 truncate pr-1">
                <i class="fa-solid fa-location-dot text-blue-700 text-[16px] "></i>
                {listing.location}
              </dd>
            </div>
          </dl>

          <div className="text-[13px] text-slate-500 h-10">
            <p className=" break-words line-clamp-2">{listing.description}</p>
          </div>

          <div className="flex  gap-1 items-center ">
            <dd className=" text-[17px] text-slate-600 font-medium">${listing.price}</dd>
            <dd className={`text-[17px] text-slate-600 font-medium ${listing.type==="sale" && "hidden"}`}> / Month</dd>
          </div>

          <div className="mt-2 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="size-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Parking</p>

                <p className="font-medium">{listing.parking} spaces</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="size-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Bathroom</p>

                <p className="font-medium">{listing.bath} rooms</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="size-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Bedroom</p>

                <p className="font-medium">{listing.bed} rooms</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    </Link>
  );
}

export default Cards;
