import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../assets/baking.png'
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import {  useSelector } from 'react-redux';
import LogoutBtn from '../LogoutBtn';
import Hamburger from '../Hamburger/Hamburger';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const user = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) {
        setDesktopMenuOpen(false);
      }
       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }

    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[])


  return (
   <header className="sticky top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className=" flex justify-between items-center h-16 px-4 lg:px-8">
          <Link
            to="/"
            aria-label="Back to homepage"
            className="flex items-center p-2 flex-shrink-0 "
          >
            <img src={logo} alt="Logo"
            className={`h-10 sm:h-12 w-auto duration-200 transition ${theme === "dark" ? "invert" : ""}`} />
            </Link>

            <div className='hidden sm:flex flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4'>
          <SearchBar />
          </div>

          <ul className="hidden lg:flex items-center space-x-6 font-medium ">
            <li className="flex">
              <Link
                to="/"
                className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="flex">
             <Link
                to="/recipes"
                className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-600">
                Recipes
              </Link>
            </li>
            <li className="flex">
              <Link
              to='/favorites'
              className='flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-600'>
                Favorites
              </Link>
            </li>
            {/* {isLoggedIn && (
             <li className="flex">
              <Link
              to='/add-recipe'
              className='flex items-center px-4 mb-1 border-b-2 border-transparent'>
                Add Recipe
              </Link>
            </li>
            )} */}
            
          </ul>
          <div className='hidden lg:flex items-center space-x-4'>
            <button
            onClick={toggleTheme}
            className='p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'
            title="Toggle theme">
              {theme === "light" ? (
                <FaSun className='text-yellow-400'/>
              ) : ( 
                <FaMoon className='text-gray-800 dark:text-gray-100' />
              )}
            </button>
          </div>
          {!isLoggedIn ? (
            <Link to='/login'>
            <button className="hidden lg:block px-4 py-2 font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
              Sign in
            </button>
            </Link>
          ) : (
            <div className='relative hidden lg:block' ref={desktopMenuRef}> 
              <div 
              onClick= {() => setDesktopMenuOpen(!desktopMenuOpen) }
              className='w-10 h-10 hidden lg:flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer'>
                {user?.name && user.name.trim() !== ""
                ? user.name[0].toUpperCase()
                : user?.email
                ? user.email[0].toUpperCase()
                : "U"}
              </div>
              {desktopMenuOpen && (
                <div className='absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2'>
                  <Link
                  to = '/profile'
                  className='block px-4 py-2 hover:text-blue-500'
                  onClick={() => setDesktopMenuOpen(false)}>
                  Profile
                  </Link>
             <LogoutBtn />
             </div>
              )}
            </div>
          )}
  
          <Hamburger isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}/>
          </div>
          {isOpen && (
            <div className= {`lg:hidden flex flex-col space-y-2 bg-white dark:bg-gray-900 shadow-md p-4
            transition-all duration-300 ease-in-out 
            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className='flex justify-center sm:hidden '>
              <SearchBar />
              </div>
            <Link
                to="/"
                className="block px-2 py-1 rounded hover:text-blue-600"
                onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link
                to="/recipes"
                className="block px-2 py-1 rounded hover:text-blue-600 "
                onClick={() => setIsOpen(false)}>
                Recipes
              </Link>
              <Link
              to='/favorites'
              className='block px-2 py-1 rounded hover:text-blue-600 '>
                Favorites
              </Link>
              <div className='flex justify-center'>
            <button
            onClick={toggleTheme}
            className='flex ietms-center space-x-2 px-2 py-2 rounded '
            title="Toggle theme">
              {theme === "light" ? (
                <FaSun className='text-yellow-400'/>
              ) : ( 
                <FaMoon className='text-gray-800 dark:text-gray-100' />
              )}
            </button>
            </div>
              {/* {isLoggedIn && (
               <Link
              to='/add-recipe'
              className='block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700'>
                Add Recipe
              </Link>
              )} */}
              {!isLoggedIn ? (
                <Link 
              to='/login'>
              <button className="self-center px-4 py-2 font-semibold rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white">
              Sign in
            </button>
            </Link>
            ) : (
               <div className='flex justify-center mt-2 relative' ref={mobileMenuRef}> 
              <div 
              onClick= {() => setMobileMenuOpen(!mobileMenuOpen) }
              className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer'>
                {user?.name && user.name.trim() !== ""
                ? user.name[0].toUpperCase()
                : user?.email
                ? user.email[0].toUpperCase()
                : "U"}
              </div>
              {mobileMenuOpen && (
                <div className='absolute top-12 right-50 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 text-center z-50'>
                  <Link
                  to = '/profile'
                  className='block px-4 py-2 hover:text-blue-500'
                  onClick={() => setMobileMenuOpen(false)}>
                  Profile
                  </Link>
             <LogoutBtn />
             </div>
              )}
            </div>
            )}
              
            </div>
          )}
  
  
        
      </header>
  )
}

export default NavBar
