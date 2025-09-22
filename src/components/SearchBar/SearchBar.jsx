import React, { useState } from 'react'
import search from '../../assets/search.png'
import { useSearch } from '../../contexts/SearchContext';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const {searchQuery, setSearchQuery } = useSearch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchQuery.trim() !== "") {
            navigate(`/recipes?search=${searchQuery}`);
        } 
    }
  return (
    <form onSubmit={handleSubmit}
    className='flex items-center border border-gray-300 dark:border-gray-600 overflow-hidden rounded-lg w-full max-w-md bg-white dark:bg-gray-900'>
      <input 
      type="text"
      value={searchQuery}
      placeholder="Search"
      onChange={(e) => setSearchQuery(e.target.value)} 
      onKeyDown={(e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
      }}
      className='flex-grow px-4 py-2 text-gray-800 dark:bg-gray-900 dark:text-gray-400  focus:outline-none'
      />
      <button type='submit'
      className='px-3 flex items-center justify-center border-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900'>
        <img src={search} alt="Search"
        className='w-5 h-5'/>
      </button>
    </form>
  )
}

export default SearchBar

