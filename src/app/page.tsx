'use client'

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Game } from '@/types/gameApi'
import { useRequest } from '@/hooks/useRequest'
import { Card } from '@/components/cards'

//Falta o skeleton
//Falta responsividade

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const [games, setGames] = useState<Game[]>([])
  const [errorMensage, setErrorMensage] = useState('')
  const [filteredGenre, setFilteredGenre] = useState<string>('')

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


  return (
    <main className="flex flex-col items-center text-white bg-[#020212]">
      <h1 className='pt-24 flex flex-col text-center text-7xl font-Heading text-red-500'>
        <span>WELCOME <span className='text-yellow-500'>TO MY</span></span>
        <span className='text-pink-500'>GAME<span className='text-blue-500'> TRACKER</span></span>
      </h1>
      <section className='pt-16 flex flex-col gap-8 items-center'>
        <h2 className='text-xl text-center'>{`Insert the game you want to search`}</h2>
        <input
          className='w-96 border border-white rounded-3xl bg-transparent h-10 px-5'
          value={searchTerm}
          onChange={setSearch}
        />
        <div className='flex gap-10'>
          <select
            className='py-6 bg-transparent w-40 border rounded-3xl px-6'
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
            className='py-6 bg-transparent w-40 border border-white rounded-3xl px-6'
          >
            Reset
          </button>
        </div>
      </section>
      {!Boolean(errorMensage) ?
        <section className='pt-40 pb-32 px-20 grid gap-y-10 sm:grid-cols-2 xl:grid-cols-3 justify-items-center w-full'>
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
        <section className='pt-48 flex flex-col items-center gap-10'>
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
    </main>
  )
}
