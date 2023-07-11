'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Game, GameRanked } from '@/types/gameApi'
import { useRequest } from '@/hooks/useRequest'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { Input } from '@/components/Input'
import { Loading } from '@/components/Loading'
import { RatingFilter } from '@/components/RatingFilter'
import { Dialog } from '@/components/Dialog'
import { useDb } from '@/hooks/useDb'
import { getJWT } from '@/lib/auth/gettJWT'
import { Header } from '@/components/Header'

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
        <Header setDarkMode={setDarkMode} />
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
          :
          <section className=' mb-10 mt-20 flex flex-col items-center text-center mx-48 gap-10'>
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
