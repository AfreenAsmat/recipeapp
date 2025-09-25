import React from 'react'
import Heroimg from '../../assets/Heroimg.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Hero() {
  const isLoggedIn = useSelector((state) => state.auth.userData);

  return (
    <section className='relative w-full min-h-screen flex flex-row items-center justify-between bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-16 py-10 overflow-hidden '>
        <div className='flex-[1] max-w-sm sm:max-w-md md:max-w-lg text-left relative z-10'>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-snug'>Don’t Know What to Cook?{''}
            <span className='text-blue-600'> We Do! 🥘</span>
        </h1>
        <p className='mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300'>
            Search thousands of recipes for whatever’s in your fridge - fast,
            easy, and delicious!
            </p>
        <div className='mt-6 flex gap-3 flex-wrap'>
            <Link to={isLoggedIn ? '/profile' : '/login'}>
            <button className='px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition'>
                Get Started
            </button>
            </Link>

            <Link to = '/recipes'>
            <button className='px-5 py-2.5 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                Browse Recipes
            </button>
            </Link>
        </div>
        </div>
        
        <div className='flex-[1.5] relative '>
      <img src={Heroimg} 
      alt="Cooking illustration" 
      className='absolute right-[-10%] top-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] object-contain'/>
      
      </div>
    </section>
  )
}

export default Hero
