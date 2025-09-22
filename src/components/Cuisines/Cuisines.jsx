import React, { useEffect, useRef, useState } from 'react'
import CuisinesCard from './CuisinesCard'
import { fetchCuisines } from '../../services/recipes';
import { cuisines } from '../../data/cuisinesData';

function Cuisines() {
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if(!scrollRef.current) return;

        const scrollContainer = scrollRef.current;

        let animationFrame;

        const scrollStep = () => {
        if(!isHovered){
          scrollContainer.scrollLeft +=2;
          if(scrollContainer.scrollLeft  >= scrollContainer.scrollWidth / 2 ) {
            scrollContainer.style.scrollBehavior = "auto";
            scrollContainer.scrollLeft = 0;
            scrollContainer.style.scrollBehavior = "smooth";
          }
        }
        animationFrame = requestAnimationFrame(scrollStep);
    };
    animationFrame = requestAnimationFrame(scrollStep);

        return () => cancelAnimationFrame(animationFrame);
    },[isHovered])

  return (
   <div className='relative w-full bg-white dark:bg-gray-900  '>
    <h2 className='text-4xl font-bold text-gray-800 dark:text-gray-200 m-4'>Explore Cuisines</h2>
    <div 
    className='flex gap-4 px-4 py-2 overflow-x-auto scrollbar-hide scroll-smooth'
    ref={scrollRef}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
    {[...cuisines, ...cuisines].map((cuisine, index) => (
    <CuisinesCard
    key={`${cuisine.id}-${index}`}
    image={cuisine.image}
    title={cuisine.title}
    />
    ))}
    </div>
   </div>
  )
}

export default Cuisines
