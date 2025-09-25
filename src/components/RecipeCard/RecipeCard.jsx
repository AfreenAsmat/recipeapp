import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FavoritesContext } from '../../contexts/FavoritesContext'
import { FaHeart, FaRegHeart, FaEdit, FaTrash , FaEllipsisV} from 'react-icons/fa';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';


function RecipeCard({recipe, onDelete}) {
    const {toggleFavorite, isFavorite } = useContext(FavoritesContext);
    const user = useSelector((state) => state.auth.userData);
    const [menuOpen, setMenuOpen] = useState(false);

    const isSpoonacular = recipe.id !== undefined;

    const id = isSpoonacular ? recipe.id : recipe.$id;
    const title = recipe.title;
    const imageUrl = isSpoonacular
    ? recipe.image
    : recipe.rimage
    ? service.getFileView(recipe.rimage)
    : "https://via.placeholder.com/300x200?text=No+Image";

    const prepTime = recipe.readyInMinutes || recipe.prepTime || null;
    const servings = isSpoonacular ? recipe.servings : recipe.servings;
    const diets = isSpoonacular
    ? Array.isArray(recipe.diets) ? recipe.diets : []
    : Array.isArray(recipe.diets) ? recipe.diets : [];

    const costPerServing = recipe.pricePerServing
    ? (recipe.pricePerServing / 100).toFixed(2)
    : recipe.costPerServing !== undefined && recipe.costPerServing !== "N/A"
    ? recipe.costPerServing
    : null ;
    

    const isOwner = !isSpoonacular && user && recipe.userId === user.$id;
    const favorited = isFavorite(id);

  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-700 hover:shadow-lg transition duration-300 flex flex-col h-full'>
      <div className='relative'>
      <img src={imageUrl}
       alt={title}
       className='w-full h-40 sm:h-48 md:h-56  dark:text-gray-200 object-cover ' />
       {!isOwner && (
      <button
        onClick={() => toggleFavorite(recipe, user.$id, isSpoonacular)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
        title={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        {favorited ? (
          <FaHeart className="text-red-500 text-lg sm:text-xl" />
        ) : (
          <FaRegHeart className="text-gray-500 text-lg sm:text-xl" />
        )}
      </button>
    )}
       </div>
       <div className='p-3 flex  flex-col flex-1'>
      <h1 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2' >
        {title}
        </h1>
      <div className='flex flex-wrap gap-1 mb-3 text-xs sm:text-sm'>
        {prepTime && prepTime !== "N/A" && (
      <span className='px-2 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-lg text-sm font-medium'>
        ⏱ {prepTime} mins
        </span>
      )}
      {diets.length > 0 && (
      <span className='px-3 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-lg text-sm font-medium'>
        🥗 {diets.join(", ")}
        </span>)}
        {servings && (
      <span className='px-3 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-lg text-sm font-medium'>
        🍴 Serves: {servings}
        </span>)}
        {costPerServing !== null && (
      <span className='px-3 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-lg text-sm font-medium'>
        💲{costPerServing}$ per serving
        </span>)}
      
      </div>

      <div className='mt-auto flex  gap-2 items-center justify-between relative  '>
      <Link to={`/recipe/${id}`} className='flex-1 mr-3'>
      <button className='w-full bg-blue-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-blue-700 transition'>
        View Recipe
      </button>
      </Link>
      {isOwner && (
        <div className='relative'>
          <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
          title='More options'>
            <FaEllipsisV className='dark:text-gray-300' />
          </button>
          {menuOpen && (
        <div className='absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50'>
        <Link to={`/edit-recipe/${id}`}
      className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'
      title='Edit Recipe'>
        <FaEdit className='mr-2 dark:text-gray-400'/> Edit
      </Link>
      <button
      onClick={() => onDelete(recipe.$id)}
      className='flex items-center w-full text-left px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'
      title='Delete Recipe'>
        <FaTrash className='mr-2 dark:text-gray-400'/> Delete
      </button>
      </div>
          )}
      </div>
       )}
      </div>
    </div>
    </div>
  )
}

export default RecipeCard
