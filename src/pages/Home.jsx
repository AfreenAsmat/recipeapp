import React from 'react'
import Hero from '../components/Hero/Hero'
import FeaturedRecipes from '../components/FeaturedRecipes/FeaturedRecipes'
import Cuisines from '../components/Cuisines/Cuisines'

function Home() {
  return (
    <div>
        <Hero />
        <FeaturedRecipes />
        <Cuisines />
      
    </div>
  )
}

export default Home
