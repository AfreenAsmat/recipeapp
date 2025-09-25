import React from 'react'
import RecipeCard from '../RecipeCard/RecipeCard'

function RecipeList({
    recipes= [],
    title,
    emptyMessage,
}) {
  return (
    <div>
        {title && <h2 className='text-2xl font-bold mb-6'>
            {title}
            </h2>}
            {recipes.length > 0 ? (
                <div className='grid 
                grid-cols-1
                sm:grid-cols-2 
                md:grid-cols-3 
                gap-6'>
                    {recipes.map((recipe) => (
                    <RecipeCard 
                    key={recipe.id || recipe.$id}
                    recipe={recipe}
                    />
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>
                    {emptyMessage || "Recipes not found."}
                    </p>
            )}
            
    </div>
  )
}

export default RecipeList
