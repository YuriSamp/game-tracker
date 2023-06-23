
type Props = {
  darkMode: boolean
}

export const Pacman = ({ darkMode }: Props) => {
  const pacmanEats = new Array(6).fill('')

  return (
    <div className='hidden md:flex items-center gap-1 mt-8'>
      <div className="pacman absolute right-10">
        <div className={`${darkMode ? 'pacman__mouth__dark' : 'pacman__mouth'}`}></div>
      </div>
      <div className='flex gap-10'>
        {pacmanEats.map((_, i) => (<div key={i} className='w-6 h-6 bg-black dark:bg-white rounded-full mt-3'></div>))}
      </div>
    </div>
  )
}
