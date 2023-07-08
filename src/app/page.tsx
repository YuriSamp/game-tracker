'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Game, GameRanked } from '@/types/gameApi'
import { useRequest } from '@/hooks/useRequest'
import { Card } from '@/components/Card'
import { Switch } from '@/components/Switch'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { Input } from '@/components/Input'
import { PacmanEats } from '@/components/Pacman'
import { Loading } from '@/components/Loading'

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const [games, setGames] = useState<GameRanked[]>([])
  const [errorMensage, setErrorMensage] = useState('')
  const [filteredGenre, setFilteredGenre] = useState<string>('')
  const [favorite, setFavorite] = useState(false)
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
    if (favorite) {
      return games.filter(game => {
        return game.title.toLocaleLowerCase().includes(lowerSearchTerm)
          && game.genre.includes(filteredGenre)
      }).filter(game => game.favorite === true)
    }
    return games.filter(game => {
      return game.title.toLocaleLowerCase().includes(lowerSearchTerm)
        && game.genre.includes(filteredGenre)
    })

  }, [games, searchTerm, filteredGenre, favorite])

  const handleSelectGenre = useCallback((genre: string) => {
    setFilteredGenre(genre)
  }, [])

  useEffect(() => {
    const newData = data.map(property => {
      return {
        ...property,
        favorite: false,
        gameReview: 0,
      }
    })

    setGames(newData)
    setErrorMensage(error)
  }, [data, error])


  const handleRetry = useCallback(() => {
    refetch()
    setErrorMensage('')
  }, [refetch, setErrorMensage])


  const onlyFavorite = () => {
    setFavorite(prev => !prev)
  }

  return (
    <main className={darkMode ? 'dark' : ''}>
      <div className='flex flex-col items-center min-h-screen text-black dark:text-white  bg-[#f9f5f2]  dark:bg-gray-800  relative max-w-[2000px]'>
        <div className='py-6 w-full px-6 sm:px-40  xl:px-72 2xl:px-96 flex justify-between'>
          <div className='flex gap-2'>
            <span className='text-pink-500 font-Heading text-3xl'>GAME<span className='text-blue-500'> TRACKER</span></span>
          </div>
          <Switch setDarkMode={setDarkMode} />
        </div>
        <PacmanEats />
        <h1 className='flex gap-5 text-center text-xl sm:text-3xl md:text-4xl xl:text-6xl font-Heading mt-5 '>
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
            <button
              className={`py-3 w-40 border rounded-xl px-6 border-black dark:border-transparent ${favorite ? 'bg-red-500 dark:bg-red-500 text-white' : 'dark:bg-[#f9f5f2]  bg-transparent text-black'} `}
              onClick={onlyFavorite}
            >
              Favorites
            </button>
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
          <section className='mt-16 mb-32 mx-20 grid gap-y-10 md:grid-cols-2 xl:grid-cols-3 gap-x-10 max-w-[1330px] '>
            {filteredGames.map(item => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                short_description={item.short_description}
                genre={item.genre}
                games={games}
                setGames={setGames}
                favorite={item.favorite}
                gameReview={item.gameReview}
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
