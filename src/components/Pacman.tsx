

export const PacmanEats = () => {
  const pacmanEats = new Array(6).fill('')

  return (
    <div className='flex items-center gap-1 mt-8'>
      <div className='flex gap-5 sm:gap-10'>
        {pacmanEats.map((_, i) => (<div key={i} className='w-6 h-6 bg-black dark:bg-white rounded-full mt-3'></div>))}
      </div>
    </div>
  )
}
