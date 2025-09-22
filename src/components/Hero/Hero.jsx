import React from 'react'
import Heroimg from '../../assets/Heroimg.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Hero() {
  const isLoggedIn = useSelector((state) => state.auth.userData);

  return (
    <section className='relative w-full min-h-screen flex flex-row items-center justify-between bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-16 py-10  '>
        <div className='flex-1 text-left max-w-2xl'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight'>Don’t Know What to Cook?{''}
            <span className='text-blue-600'> We Do! 🥘</span>
        </h1>
        <p className='mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300'>
            Search thousands of recipes for whatever’s in your fridge - fast,
            easy, and delicious!
            </p>
        <div className='mt-8 flex gap-4 flex-wrap'>
            <Link to={isLoggedIn ? '/profile' : '/login'}>
            <button className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition'>
                Get Started
            </button>
            </Link>

            <Link to = '/recipes'>
            <button className='px-6 py-3 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                Browse Recipes
            </button>
            </Link>
        </div>
        </div>
        
        <div className='flex-1 flex justify-center '>
      <img src={Heroimg} 
      alt="Cooking illustration" 
      className='w-full max-w-xs  sm:max-w-sm md:max-w-md lg:max-w-lg object-contain'/>
      
      </div>
    </section>
  )
}

export default Hero
