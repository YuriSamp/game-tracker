'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Game } from '@/types/gameApi'
import { useRequest } from '@/hooks/useRequest'
import { Card } from '@/components/Card'
import { Switch } from '@/components/Switch'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { Input } from '@/components/Input'
import { PacmanEats } from '@/components/Pacman'
import { Loading } from '@/components/Loading'

//Falta o skeleton
//Falta responsividade

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const [games, setGames] = useState<Game[]>([])
  const [errorMensage, setErrorMensage] = useState('')
  const [filteredGenre, setFilteredGenre] = useState<string>('')
  const [darkMode, setDarkMode] = useState(true)

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


  const handleRetry = useCallback(() => {
    refetch()
    setErrorMensage('')
  }, [refetch, setErrorMensage])


  console.log({ isLoading, errorMensage })

  return (
    <main className={darkMode ? 'dark' : ''}>
      <div className='flex flex-col items-center min-h-screen text-black dark:text-white  bg-[#f9f5f2]  dark:bg-gray-800  relative'>
        <div className='py-6 w-full sm:px-96 flex justify-between'>
          <div className='flex gap-2'>
            <span className='text-pink-500 font-Heading text-3xl'>GAME<span className='text-blue-500'> TRACKER</span></span>
          </div>
          <Switch setDarkMode={setDarkMode} />
        </div>
        <PacmanEats />
        <h1 className='flex gap-5 text-center text-3xl sm:text-4xl md:text-5xl  xl:text-6xl font-Heading mt-5 '>
          <span className='text-red-500' >Find </span>
          <span className='text-orange-500' > your </span>
          <span className='text-green-500' >favorite </span>
          <span className='text-yellow-500'>game</span>
        </h1>
        <section className='flex flex-col gap-8 items-center mt-12 w-full'>
          <Input
            onChange={setSearchTerm}
            placeholder='Fall guys'
            value={searchTerm}
          />
          <div className='flex flex-col sm:flex-row gap-5 sm:gap-10'>
            <Select
              onChange={handleSelectGenre}
              value={filteredGenre}
              options={genres}
            />
            <Button
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </section>
        {isLoading ? <Loading /> : null}
        {!Boolean(errorMensage) ?
          <section className='mt-16 mb-32 mx-20 grid gap-y-10 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 max-w-[1330px] '>
            {filteredGames.map(item => (
              <Card
                key={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                short_description={item.short_description}
                genre={item.genre}
              />
            ))}
          </section>
          :
          <section className='mt-32 flex flex-col items-center text-center mx-48 gap-10'>
            <h2 className='text-6xl font-Heading'>
              {errorMensage}
            </h2>
            <Button
              onClick={handleRetry}
            >
              Retry
            </Button>
          </section>
        }
      </div>
    </main>
  )
}
