import React from 'react'
import { useNavigate } from 'react-router-dom'

function CuisinesCard({id, image, title}) {
    const navigate = useNavigate();
  return (
    <div className='min-w-[250px] max-w-[250px] rounded-lg overflow-hidden shadow-md dark:shadow-gray-700 bg-white dark:bg-gray-900'>
      <img 
      src={image} 
      alt={title} 
      className='w-full h-40 object-contain'/>
      <div className='p3 text-center'>
      <h2 className='text-base font-semibold text-gray-800 dark:text-gray-100 '>{title}</h2>
      <button onClick={() => navigate(`/recipes?cuisine=${title}`)} 
      className='m-2 px-3 py-1 bg-gray-800 dark:bg-gray-100 rounded text-white dark:text-gray-800 text-sm rounded hover:bg-gray-600'
      >View Recipes
      </button>
      </div>
    </div>
  )
}

export default CuisinesCard
