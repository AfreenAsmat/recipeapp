import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
import RecipeList from '../components/RecipeList/RecipeList';
import { fetchRecipes, fetchRandomRecipes, fetchCuisines } from '../services/recipes';
import Loader from '../components/Loader/Loader';
import service from '../appwrite/config';

function Recipes() {
   // const data = useLoaderData();

   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const searchQuery = params.get("search") || "" ;
   const cuisineQuery = params.get("cuisine") || "";

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isRandom, setIsRandom] = useState(false);
    const pageSize = 12;

     const loadRecipes = async (query = "", cuisine = "", page = 1, append = false) => {
        try {
            setLoading(true);
            setError(null);

            let apiRecipes = [];
            let userRecipes = [];

            if (query){
              setIsRandom(false);
            const data = await fetchRecipes(query, pageSize, (page - 1) * pageSize);
            apiRecipes = data.results || [];
             if (apiRecipes.length === 0 && (!userRecipes || userRecipes.length === 0)) {
              throw new Error(`No recipes found for "${query}"`);
            }
            setTotalResults(data.totalResults);
            } 
            else if (cuisine) {
              setIsRandom(false);
              const data = await fetchCuisines(cuisine, pageSize, (page - 1) * pageSize);
              apiRecipes = data.results || [];
              if (apiRecipes.length === 0 && (!userRecipes || userRecipes.length === 0)){
                throw new Error(`No recipes found for cuisine: "${cuisine}"`);
              }
              setTotalResults(data.totalResults);
            }  else {
              setIsRandom(true);
                const data = await fetchRandomRecipes(pageSize);
                apiRecipes = data.recipes || [];
                if (apiRecipes.length === 0) {
                  throw new Error("No recipes available.");
                }
                setTotalResults(null);
            } 

            const userRecipesData = await service.fetchUserRecipes(query, cuisine);
            userRecipes = userRecipesData.documents || [];
         
            let combined = [...userRecipes, ...apiRecipes];
            combined = combined.sort(() => Math.random() - 0.5);
            setRecipes(prev => append ? [...prev, ...combined] : combined);

        } catch (error) {
            console.error("Error fetching recipes:", error); 
            setError(error.message || "Something went wrong. Please try again later.");
            setRecipes([]);
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(() => {
      loadRecipes(searchQuery, cuisineQuery, page);
},[searchQuery,cuisineQuery, page]);

const getPaginationRange = (currentPage, totalPages) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let lastPage;

  for (let i = 1; i <= totalPages; i++){
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)){
      range.push(i);
    }
  }
  for (let i of range) {
    if (lastPage){
      if (i - lastPage === 2){
        rangeWithDots.push(lastPage + 1);
      } else if (i - lastPage > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    lastPage = i;
  }
  return rangeWithDots;
};

const totalPages = Math.ceil(totalResults / pageSize);
  const paginationRange = getPaginationRange(page, totalPages);
   

    if (loading) return <Loader />;
    if (error) {
      return (
        <div className='flex flex-col items-center justify-center min-h-[60vh] text-center p-6'>
          <h2 className='text-2xl font-bold text-red-600'>Oops!</h2>
      {/* <p className='mt-4 text-gray-700 dark:text-gray-300'>{error}</p> */}
      <p
      className='mt-6 font-bold text-xl dark:text-gray-100'>
        Please try again later.
      </p>
      </div>
      )
    }
  return (
    <div className='dark:bg-gray-900'>
      <h1 className='text-3xl font-bold m-3 text-gray-800 dark:text-gray-200'>
        {searchQuery  
        ? `Results for ${searchQuery}` 
        : cuisineQuery
        ? `Cuisine: ${cuisineQuery}`
        : "Recipes"}
        </h1>
      <RecipeList recipes={recipes}/>
      {isRandom ? (
        <div className='flex justify-center my-6'>
          <button 
          onClick={() => loadRecipes("", "", 1, true)}
          className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition'>
            Load More
          </button>
        </div>
      ) : (
      <div className="flex justify-center gap-2 my-6">
        <ul className='flex justify-center gap-1 text-gray-900 dark:text-gray-200'>
          <li>
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    aria-label='Previous page'
    className={`grid size-8 place-content-center rounded border transition-colors
      ${page === 1 
        ? "border-gray-300 text-gray-400 cursor-not-allowed" 
        : "border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      }`}
  >
    ‹
  </button>
  </li>
  {paginationRange.map((num, index) => (
    <li key={index}>
      {num === "..." ? (
        <span className='block size-8 text-center'>...</span>
      ) : (
      <button onClick={() => setPage(num)}
        className={`block size-8 rounded text-center text-sm font-medium transition-colors
        ${page === num 
          ? "border border-indigo-600 bg-indigo-600 text-white"
          : "border border-gray-200 hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-700"
        }`}>
          {num}
        </button>
      )}
    </li>
  ))}
 <li>
  <button
    onClick={() =>
      setPage((prev) => Math.min(prev + 1, Math.ceil(totalResults / pageSize)))}
    disabled={page === Math.ceil(totalResults / pageSize)}
    aria-label='Next page'
    className={`grid size-8 place-content-center rounded border transition-colors
      ${page === Math.ceil(totalResults / pageSize)
        ? "border-gray-300 text-gray-400 cursor-not-allowed"
        : "border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      }`}
  >
    ›
  </button>
  </li>
  </ul>
</div>
      )}
    </div>
  )
}

export default Recipes
