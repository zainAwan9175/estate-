import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./Navbar.css"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { active, currentuser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const newsearch = urlParams.get("searchTerm");

    if (newsearch) {
      setSearchTerm(newsearch);
    }
  }, [window.location.search]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="z-50 flex justify-between items-center h-[9vh] bg-white shadow-2xl p-4 md:p-8 fixed w-[100vw] top-0" ref={navbarRef}>
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-blue-500"> Zain
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-slate-400">
         Estate
        </span>
       
      </a>

      <div className="md:hidden flex space-x-2">
        <button
          type="button"
          onClick={toggleSearch}
          className="text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          <i className="fa-solid fa-magnifying-glass font-bold text-[20px]"></i>
        </button>
        <button
          type="button"
          onClick={toggleMenu}
          className="text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          <i className={`font-bold text-[20px] fa-solid ${isMenuOpen ? "fa-x rotate-in" : "fa-bars rotate-out"}`}></i>
        </button>
      </div>

      <div
        ref={searchRef}
        className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-transform duration-300 ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative w-[340px] max-w-md bg-white p-4 rounded-lg shadow-lg">
          <button
            onClick={closeSearch}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 mt-2"
          >
            <i className="fa-solid fa-x"></i>
          </button>
          <form onSubmit={handleSearch} className="flex">
            <input
              value={searchTerm}
              type="text"
              name="search"
              onChange={(e) => setSearchTerm(e.target.value)}
              id="search-navbar"
              className="block p-2 w-[240px] md:w-full text-sm outline-none text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-l-md"
              placeholder="Search..."
            />
            <button className="w-[40px] bg-blue-500 rounded-r-md p-1">
              <i className="fa-brands fa-searchengin text-white text-[18px]"></i>
            </button>
          </form>
        </div>
      </div>

      <div className={`hidden md:block md:w-1/3 ${isSearchOpen ? "hidden" : "flex justify-center"}`}>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchTerm}
            name="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-navbar"
            className="block p-2 w-[240px] md:w-full text-sm outline-none text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-l-md"
            placeholder="Search..."
          />
          <button className="w-[40px] bg-blue-500 rounded-r-md justify-center items-center flex">
            <i className="fa-brands fa-searchengin text-white text-[18px]"></i>
          </button>
        </form>
      </div>

      <div
        ref={menuRef}
        className={`text-[17px] z-10 mt-[32vh] w-[350px]  md:mt-[0vh] absolute md:static md:flex md:w-auto transition-transform duration-300 ${
          isMenuOpen
            ? "left-1/2 transform -translate-x-1/2 items-center w-full translate-x-0"
            : "-translate-x-[210%] md:translate-x-0"
        }`}
        id="navbar-menu"
      >
        <ul
          className={`flex flex-col  items-center p-8 md:p-0 font-medium border bg-white   border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ${
            active === "about" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <li>
            <Link to="/">
              <span
                className={`block p-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                  active === "home" ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span
                className={`block p-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                  active === "about" ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                About
              </span>
            </Link>
          </li>
          <li>
            {Object.keys(currentuser).length !== 0 ? (
              <Link to="/profile">
                <img
                  src={currentuser.photo}
                  className="border rounded-full w-[35px] h-[35px]"
                  alt="Profile"
                />
              </Link>
            ) : (
              <Link to="/signin">
                <span
                  className={`block p-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                    active === "signin" ? "text-blue-600 font-bold" : "text-gray-500"
                  }`}
                >
                  Sign In
                </span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
