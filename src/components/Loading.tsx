import React from 'react'



export const Loading = () => {
  return (
    <div className='relative my-16 flex items-center'>
      <h2 className='mb-28 font-Heading text-xl'>Carregando</h2>
      <div className="loader">
        <div className="circles">
          <span className="one bg-black dark:bg-white" ></span>
          <span className="two bg-black dark:bg-white"></span>
          <span className="three bg-black dark:bg-white"></span>
        </div>
        <div className="pacman">
          <span className="top"></span>
          <span className="bottom"></span>
          <span className="left"></span>
          <div className="eye"></div>
        </div>
      </div>
    </div>
  )
}
