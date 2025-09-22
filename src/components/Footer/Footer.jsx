import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='mt-10 border-t border-gray-200 dark:border-gray-700 justify-between shadow-md dark:shadow-gray-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-full'>
      <div className='px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
        <h2 className='text-xl font-semibold'>Recipe Finder</h2>
        <p className='text-sm mt-1'>Discover and save your favorite recipes</p>

        </div>
        <div className='flex flex-col md:items-end px-10 '>
          <h3 className='text-lg font-medium'>Quick Links</h3>
          <div className='flex flex-col mt-2 space-y-2'>
          <Link to="/" className='hover:underline'>Home</Link>
          <Link to="/favorites"className='hover:underline'>Favourites</Link>
          <Link to="/recipes"  className='hover:underline'>Recipes</Link>
        </div>
        </div>
        </div>

        <div className='border-t border-gray-300 w-fit mx-auto px-4 '>
        <p className='text-center py-4 text-xs  text-gray-500'>
          © {new Date().getFullYear()} Recipe Finder. All rights reserved.</p>
          </div>
    </footer>
  )
}

export default Footer


