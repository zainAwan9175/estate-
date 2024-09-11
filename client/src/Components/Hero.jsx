import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';

function Hero() {

  useEffect(() => {
    const typed = new Typed('#typed-element', {
      strings: ['Find your next perfect place with ease.', 'Discover your dream home with Zain Estate.'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: true,  // Ensure the cursor is shown
      cursorChar: '|',   // Customize the cursor character if needed
    });

    // Cleanup function to destroy the Typed instance when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center md:h-[91vh]">
      <section 
        className="bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat w-full h-[60vh] md:h-[100vh] flex justify-center items-center"
      >
        <div className="bg-gray-900/75 sm:bg-transparent sm:bg-gradient-to-r from-gray-900/95 to-gray-900/25 w-full h-full flex justify-center items-center">
          <div className="text-center w-[90vw] md:w-1/2 flex flex-col items-center rounded-lg mt-10 p-6">
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              <span className="text-rose-500 xl:text-[4rem]  md:text-[3rem]  text-[2rem]">
                <span id="typed-element"></span>
              </span>
            </h1>

            <p className="mt-4 text-white sm:text-xl ">
              Zain Estate will help you find your home fast, easy, and comfortably.
              Our expert support is always available.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                to="/search"
                className="block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:text-rose-500"
              >
                Show Listings
              </Link>
              <Link
                to="/signin"
                className="block rounded bg-slate-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-slate-700 focus:outline-none focus:ring active:bg-rose-500"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section> 
    </div>
  );
}

export default Hero;
