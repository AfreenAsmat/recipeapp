import React from 'react'

function Hamburger({isOpen, toggle}) {
  return (
    <label className='relative w-8 h-7 flex flex-col justify-between cursor-pointer lg:hidden '>
        <input 
        type="checkbox"
        checked={isOpen}
        onChange={toggle}
        className='peer hidden' />
        <span className='h-1 w-full bg-black dark:bg-white rounded-lg transition-all duration-300 peer-checked:rotate-45 peer-checked:translate-y-3'></span>
        <span className='h-1 w-full bg-black dark:bg-white rounded-lg transition-all duration-300 peer-checked:opacity-0'></span>
        <span className='h-1 w-full bg-black dark:bg-white rounded-lg transition-all duration-300 peer-checked:-rotate-45 peer-checked:-translate-y-3'></span>
    </label>
  )
}

export default Hamburger
