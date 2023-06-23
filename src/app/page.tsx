'use client'

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Game } from '@/types/gameApi'
import { useRequest } from '@/hooks/useRequest'
import { Card } from '@/components/cards'

//Falta o skeleton
//Falta responsividade

export default function Home() {

  const [searchTerm, setName] = useState('')
  const [games, setGames] = useState<Game[]>([])
  const [errorMensage, setErrorMensage] = useState('')
  const [filteredGenre, setFilteredGenre] = useState<string>('')

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const { data, error, isLoading, refetch } = useRequest<Game[]>('/data')

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
    <main className="flex flex-col items-center h-screen text-white">
      <h1 className='pt-24 flex flex-col text-center text-7xl font-Heading text-red-600'>
        <span>WELCOME <span className='text-yellow-400'>TO MY</span></span>
        <span className='text-blue-600'>GAME TRACKER</span>
      </h1>
      <section className='pt-16 flex flex-col items-center'>
        <h2 className='pb-8 text-xl text-center'>{`Insert the game you want to search`}</h2>
        <input
          className='w-96 border border-white rounded-3xl bg-transparent h-10 px-5'
          onChange={setSearch}
        />
      </section>
      <select
        className='py-6 bg-red-500 w-40'
        onChange={(e) => handleSelectGenre(e.target.value)}
      >
        {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
      </select>
      {!Boolean(errorMensage) ?
        <section className='pt-40 pb-32 px-20 grid gap-y-5 sm:grid-cols-2 xl:grid-cols-3 justify-items-center w-full'>
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
