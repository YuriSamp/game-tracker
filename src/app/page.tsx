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
import { RatingFilter } from '@/components/RatingFilter'
import { Dialog } from '@/components/Dialog'
import { useDb } from '@/hooks/useDb'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import { getJWT } from '@/lib/auth/gettJWT'

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const [games, setGames] = useState<GameRanked[]>([])
  const [errorMensage, setErrorMensage] = useState('')
  const [filteredGenre, setFilteredGenre] = useState<string>('')
  const [favorite, setFavorite] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [ranked, setRanked] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { data, error, isLoading, refetch } = useRequest<Game[]>('/data')
  const { firestoreGames } = useDb()

  useEffect(() => {
    const setData = async () => {
      const newData = data.map(property => {
        return {
          ...property,
          favorite: false,
          gameReview: 0,
        }
      })

      if (firestoreGames === undefined) {
        setGames(newData)
        setErrorMensage(error)
        return
      }

      const newData2 = newData.map(game => {
        for (let i = 0; i < firestoreGames.length; i++) {
          if (game.id === firestoreGames[i].id) {
            game.favorite = firestoreGames[i].favorite
            game.gameReview = firestoreGames[i].gameReview
          }
        }
        return game
      })
      setGames(newData2)
      setErrorMensage(error)
    }

    setData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

  const genres = useMemo(() => {
    return ['', ...Array.from(new Set(games.map(game => game.genre)))]
  }, [games])

  const filteredGames = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLocaleLowerCase()

    const _filteredGames = games.filter(game => {
      return game.title.toLocaleLowerCase().includes(lowerSearchTerm)
        && game.genre.includes(filteredGenre)
    }).sort((a, b) => ranked ? b.gameReview - a.gameReview : a.gameReview - b.gameReview)

    if (favorite) {
      return _filteredGames.filter(game => game.favorite === true)
    }

    return _filteredGames

  }, [games, searchTerm, filteredGenre, favorite, ranked])

  const handleSelectGenre = useCallback((genre: string) => {
    setFilteredGenre(genre)
  }, [])


  const reset = () => {
    setSearchTerm('')
    setFilteredGenre('')
  }

  const handleRetry = useCallback(() => {
    refetch()
    setErrorMensage('')
  }, [refetch, setErrorMensage])


  const onlyFavorite = () => {
    const JWT = getJWT()
    if (JWT === undefined) {
      setModalIsOpen(true)
      return
    }

    setFavorite(prev => !prev)
  }


  return (
    <main className={darkMode ? 'dark' : ''}>
      <div className='flex flex-col items-center min-h-screen text-black dark:text-white  bg-[#f9f5f2]  dark:bg-gray-800 relative max-w-[2000px] px-6 sm:px-20 md:px-52  xl:px-72 2xl:px-80'>
        <div className='py-6 w-full sm:min-w-[450px] md:min-w-[650px] flex items-center justify-between'>
          <div className='flex gap-2'>
            <span className='text-pink-500 font-Heading text-3xl flex flex-col md:flex-row gap-1 md:gap-3 items-center'>GAME<span className='text-blue-500'> TRACKER</span></span>
          </div>
          <div className='hidden sm:flex items-center gap-5 '>
            <Switch setDarkMode={setDarkMode} />
            <Link href={'/auth/signIn'} className='py-3 hidden sm:flex bg-transparent w-24 items-center justify-center border dark:bg-[#f9f5f2] text-black rounded-xl px-2 border-black dark:border-transparent'>Sign In</Link>
          </div>
          <div className='flex sm:hidden'>
            <Sidebar setDarkMode={setDarkMode} />
          </div>
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
        </section >
        {isLoading ?
          <Loading />
          :
          <RatingFilter
            ranked={ranked}
            setRanked={setRanked}
          />
        }
        {!Boolean(errorMensage) ?
          <>
            <section className='my-8 grid gap-10 lg:grid-cols-2 3xl:grid-cols-3 max-w-[1330px] '>
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
                  setModalIsOpen={setModalIsOpen}
                />
              ))}
            </section>
          </>
          :
          <section className=' mb-10 sm:mb-0 mt-32 flex flex-col items-center text-center mx-48 gap-10'>
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
      <Dialog
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </main>
  )
}
