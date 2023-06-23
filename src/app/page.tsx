'use client'

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Game } from '@/types/gameApi'
import { useRequest } from '@/hooks/useRequest'
import { Card } from '@/components/cards'
import { Switch } from '@/components/ui/switch'

//Falta o skeleton
//Falta responsividade

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const [games, setGames] = useState<Game[]>([])
  const [errorMensage, setErrorMensage] = useState('')
  const [filteredGenre, setFilteredGenre] = useState<string>('')
  const [darkMode, setDarkMode] = useState(true)

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)
  const { data, error, isLoading, refetch } = useRequest<Game[]>('/data')

  const reset = () => {
    setSearchTerm('')
    setFilteredGenre('')
  }

  const genres = useMemo(() => {
    return ['', ...Array.from(new Set(games.map(game => game.genre)))]
  }, [games])

  const filteredGames = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLocaleLowerCase()
    return games.filter(game => {
      return game.title.toLocaleLowerCase().includes(lowerSearchTerm)
        && game.genre.includes(filteredGenre)
    })
  }, [games, searchTerm, filteredGenre])

  const handleSelectGenre = useCallback((genre: string) => {
    setFilteredGenre(genre)
  }, [])

  useEffect(() => {
    setGames(data)
    setErrorMensage(error)
  }, [data, error])

  const pacmanEats = new Array(6).fill('')

  return (
    <main className={darkMode ? 'dark' : ''}>
      <div className='flex flex-col items-center min-h-screen text-black dark:text-white  bg-[#f9f5f2]  dark:bg-gray-800  relative'>
        <div className='py-6 w-full sm:px-48 flex justify-between'>
          <span className='text-pink-500 font-Heading text-3xl'>GAME<span className='text-blue-500'> TRACKER</span></span>
          <Switch setDarkMode={setDarkMode} />
        </div>
        <div className='hidden md:flex items-center gap-1 mt-8'>
          <div className="pacman absolute right-10">
            <div className={`${darkMode ? 'pacman__mouth__dark' : 'pacman__mouth'}`}></div>
          </div>
          <div className='flex gap-10'>
            {pacmanEats.map((_, i) => (<div key={i} className='w-6 h-6 bg-black dark:bg-white rounded-full mt-3'></div>))}
          </div>
        </div>
        <h1 className='flex gap-5 text-center text-3xl sm:text-4xl md:text-5xl  xl:text-6xl font-Heading mt-5 '>
          <span className='text-red-500' >Find </span>
          <span className='text-orange-500' > your </span>
          <span className='text-green-500' >favorite </span>
          <span className='text-yellow-500'>game</span>
        </h1>
        <section className='flex flex-col gap-8 items-center mt-12 w-full'>
          <input
            className='w-60 sm:w-1/2 border border-black dark:border-transparent  dark:bg-[#f9f5f2]  text-neutral-700 rounded-3xl bg-transparent h-14 px-5 outline-none text-2xl '
            placeholder='Fall guys'
            value={searchTerm}
            onChange={setSearch}
            autoFocus={true}
          />
          <div className='flex flex-col sm:flex-row gap-5 sm:gap-10'>
            <select
              className='py-3 bg-transparent w-40 border rounded-xl px-6 dark:bg-[#f9f5f2]  bg-[#020212] text-black border-black dark:border-transparent '
              onChange={(e) => handleSelectGenre(e.target.value)}
              value={filteredGenre}
            >
              {genres.map(genre =>
                <option
                  key={genre}
                  value={genre}
                  className='text-black'
                >
                  {genre ? genre : 'Genre'}
                </option>)}
            </select>
            <button
              onClick={reset}
              className='py-3 bg-transparent w-40 border dark:bg-[#f9f5f2]  bg-[#020212] text-black rounded-xl px-6 border-black dark:border-transparent '
            >
              Reset
            </button>
          </div>
        </section>
        {!Boolean(errorMensage) ?
          <section className='mt-16 mb-32 px-20 grid gap-y-10 sm:grid-cols-2 xl:grid-cols-3 justify-items-center w-full '>
            {filteredGames.map(item => (
              <Card
                key={item.id}
                developer={item.developer}
                title={item.title}
                thumbnail={item.thumbnail}
                publisher={item.publisher}
                release_date={item.release_date}
                genre={item.genre}
              />
            ))}
          </section>
          :
          <section className='mt-32 flex flex-col items-center text-center mx-48 gap-10'>
            <h2 className='text-6xl font-Heading'>
              {errorMensage}
            </h2>
            <button
              className='py-3 bg-transparent w-40 border dark:bg-[#f9f5f2]  bg-[#020212] text-black rounded-xl px-6 border-black dark:border-transparent'
              onClick={refetch}
            >
              Retry
            </button>
          </section>
        }
      </div>
    </main>
  )
}
