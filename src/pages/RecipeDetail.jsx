import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRecipeDetails } from '../services/recipes';
import Loader from '../components/Loader/Loader';
import service from '../appwrite/config';

function RecipeDetail() {
    const {id} = useParams();
    
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const isSpoonacular = /^\d+$/.test(id);


    useEffect(() => {
        async function loadRecipe(){
            try {
                let data;
                if (isSpoonacular) {
                data = await fetchRecipeDetails(id);
                } else {
                    data = await service.getRecipe(id);
                }
                setRecipe(data)
            } catch (error) {
                console.error(error); 
            }
            finally {
                setLoading(false)
            }
        }
        loadRecipe();
    }, [id, isSpoonacular])

    if(loading) return <Loader />
    if(!recipe) return <p className='text-center text-gray-500'>Recipe not found.</p>

    const title =  recipe.title;
    const image = isSpoonacular 
    ? recipe.image 
    : recipe.rimage 
    ? service.getFileView(recipe.rimage) 
    : "https://via.placeholder.com/300x200?text=No+Image";
    const servings = isSpoonacular ? recipe.servings : recipe.servings;
    const prepTime = isSpoonacular ? recipe.readyInMinutes : recipe.prepTime;
    const diets = isSpoonacular 
    ? recipe.diets?.join(', ') 
    : recipe.diets || "No diet info";
    const cost = isSpoonacular
    ? recipe.pricePerServing 
      ? `$${(recipe.pricePerServing / 100).toFixed(2)}` 
      : "N/A"
    : recipe.costPerServing 
      ? `$${recipe.costPerServing}` 
      : "N/A";

  return (
    <div className='max-w-4xl mx-auto p-6 dark:bg-gray-900'>
      <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center'>
        {title}</h1>
        <div className='flex justify-center'>
      <img 
      src={image} 
      alt={title} 
      className='rounded-xl shadow-lg mb-6 max-h-96 w-full object-fill'/>
      </div>
      <div className='flex flex-wrap gap-3 mb-8 justify-center'>
        {servings && (
      <span className='px-4 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full text-sm font-medium shadow'>
        🍴 Serves: {servings}</span> )}
        {diets.length > 0 && (
      <span className='px-4 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full text-sm font-medium shadow'>
        🥗 {diets}</span>)}
        {cost !== null && (
      <span className='px-4 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full text-sm font-medium shadow'>
        💲{cost} per serving</span>)}
        {prepTime && prepTime !== "N/A" && (
      <span className='px-4 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full text-sm font-medium shadow'>
        ⏱ {prepTime} mins</span>)}
      </div>

      <section className='mb-8'>
      <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 border-b pb-2'>Ingredients</h2>
      <ul className='list-disc list-inside space-y-2'>
        {isSpoonacular
        ? recipe.extendedIngredients.map((ing) => (
            <li key={ing.id} className='text-gray-600 dark:text-gray-300'>{ing.original}</li>))
        : Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        .map((ing, idx) => (
        <li key={idx} className='text-gray-600 dark:text-gray-300'>
            {ing}</li>))
        : recipe.ingredients
        ? recipe.ingredients.split("\n").map((ing, idx) => (
            <li key={idx} className='text-gray-600 dark:text-gray-300'>
                {ing}</li>
        ))    
        : <li className='text-gray-500'>No ingredients found.</li>
    }
      </ul>
      </section>

      <section className='mb-8'>
      <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 border-b pb-2'>Instructions</h2>
      {isSpoonacular ? (
      <div className='text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed'
      dangerouslySetInnerHTML={{ __html: recipe.instructions}}
      />
      ) : (
        <p className='text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line'>
            {recipe.instruction}
        </p>
      )}
      </section>

      {isSpoonacular && recipe.nutrition?.nutrients && (
      <section>
      <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4 border-b pb-2'>Nutrition</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
      {recipe.nutrition?.nutrients?.map((n) => (
        <div
         key={n.name}
         className='bg-gray-100 dark:bg-gray-600 rounded-lg shadow p-2 text-gray-700 dark:text-gray-200 text-sm'>
            {n.name}: <span className='font-semibold'>{n.amount} {n.unit} </span> 
        </div>
      ))}
      </div>
      </section>
      )}
    </div>
  )
}

export default RecipeDetail
