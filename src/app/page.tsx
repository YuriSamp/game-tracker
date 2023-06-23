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
    return Array.from(new Set(games.map(game => game.genre)))
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
      <div className='flex flex-col items-center min-h-screen text-black dark:text-white  bg-[#f9f5f2]  dark:bg-[#020212] relative'>
        <div className='py-6 w-ful sm:px-48 flex self-cente sm:self-end r'>
          <Switch setDarkMode={setDarkMode} />
        </div>
        <h1 className='flex flex-col text-center text-4xl sm:text-6xl md:text-7xl  xl:text-8xl font-Heading text-red-500'>
          <span>WELCOME <span className='text-yellow-500'>TO MY</span></span>
          <span className='text-pink-500'>GAME<span className='text-blue-500'> TRACKER</span></span>
        </h1>
        <div className='hidden md:flex items-center gap-1 py-8'>
          <div className="pacman absolute right-10">
            <div className={`${darkMode ? 'pacman__mouth__dark' : 'pacman__mouth'}`}></div>
          </div>
          <div className='flex gap-10'>
            {pacmanEats.map((_, i) => (<div key={i} className='w-6 h-6 bg-black dark:bg-white rounded-full'></div>))}
          </div>
        </div>
        <section className='flex flex-col gap-8 items-center'>
          <h2 className='sm:text-xl text-center'>Insert the game you want to search</h2>
          <input
            className='w-60 sm:w-96 border border-black dark:border-white rounded-xl bg-transparent h-10 px-5'
            value={searchTerm}
            onChange={setSearch}
          />
          <div className='flex flex-col sm:flex-row gap-5 sm:gap-10'>
            <select
              className='py-6 bg-transparent w-40 border rounded-xl px-6 border-black dark:border-white'
              onChange={(e) => handleSelectGenre(e.target.value)}
            >
              {genres.map(genre => <option
                key={genre}
                value={genre}
                className='text-black'
              >
                {genre}
              </option>)}
            </select>
            <button
              onClick={reset}
              className='py-6 bg-transparent w-40 border border-black dark:border-white rounded-xl px-6'
            >
              Reset
            </button>
          </div>
        </section>
        {!Boolean(errorMensage) ?
          <section className='pt-40 pb-32 px-20 grid gap-y-10 sm:grid-cols-2 xl:grid-cols-3 justify-items-center w-full '>
            {filteredGames.slice(0, 21).map(item => (
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
          <section className='py-48 flex flex-col items-center gap-10'>
            <h2 className='text-3xl font-Heading'>
              {errorMensage}
            </h2>
            <button
              className='w-48 h-12 bg-transparent border border-white rounded-lg'
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
