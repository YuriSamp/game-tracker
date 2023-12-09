'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Game, GameRanked, Rating } from '@/types/gameApi'
import { useRequest } from '@/hooks/useRequest'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { Input } from '@/components/Input'
import { Loading } from '@/components/Loading'
import { RatingFilter } from '@/components/RatingFilter'
import { Dialog } from '@/components/Dialog'
import { useDb } from '@/hooks/useDb'
import { Header } from '@/components/Header'
import { auth } from '@/lib/firebase/config';
import { BackToTop } from '@/components/BackToTop'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMensage, setErrorMensage] = useState('')
  const [filteredGenre, setFilteredGenre] = useState<string>('')
  const [favorite, setFavorite] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [ranked, setRanked] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { data: games, error, isLoading, refetch } = useRequest<Game[]>('/data')
  const { userPreferences, saveUserPreferences } = useDb()
  const { user } = useAuth()

  const handleSavePreferences = useCallback((id: number, gamePreference: Rating) => {
    saveUserPreferences(id, gamePreference, userPreferences)
  }, [saveUserPreferences, userPreferences])
  

  useEffect(() => {
    setErrorMensage(error)
  }, [error])


  useEffect(() => {
    if (!user) {
      setFavorite(false)
    }
  }, [user])

  const genres = useMemo(() => {
    return ['', ...Array.from(new Set(games.map(game => game.genre)))]
  }, [games])

  const filteredGames = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLocaleLowerCase()

    const _gamesWithUserPreferences = games.map(game => ({
      ...game,
      favorite: userPreferences[game.id]?.favorite || false,
      gameReview: userPreferences[game.id]?.gameReview || 0
    }))

    const _filteredGames = _gamesWithUserPreferences.filter(game => {
      return game.title.toLocaleLowerCase().includes(lowerSearchTerm)
        && game.genre.includes(filteredGenre)
    }).sort((a, b) => ranked ? b.gameReview - a.gameReview : a.gameReview - b.gameReview)

    if (favorite) {
      return _filteredGames.filter(game => game.favorite === true)
    }

    return _filteredGames

  }, [games, searchTerm, filteredGenre, favorite, ranked, userPreferences])

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
    if (!auth.currentUser) {
      setModalIsOpen(true)
      return
    }

    setFavorite(prev => !prev)
  }

  const renderCards = useCallback((game: GameRanked) => (
    <Card
      key={game.id}
      id={game.id}
      title={game.title}
      thumbnail={game.thumbnail}
      short_description={game.short_description}
      genre={game.genre}
      favorite={game.favorite}
      gameReview={game.gameReview}
      setModalIsOpen={setModalIsOpen}
      handleSavePreferences={handleSavePreferences}
    />
  ), [setModalIsOpen, handleSavePreferences])

  return (
    <main className={darkMode ? 'dark' : ''}>
      <div className='flex flex-col items-center min-h-screen text-black dark:text-white  bg-PrimaryLight  dark:bg-gray-800 relative max-w-[2000px] px-6 sm:px-20 md:px-52  xl:px-72 2xl:px-80'>
        <Header setDarkMode={setDarkMode} />
        <section className='flex flex-col gap-8 items-center mt-12 w-full'>
          <Input
            onChange={setSearchTerm}
            placeholder='Fall guys'
            value={searchTerm}
          />
          <div className='flex flex-col sm:flex-row gap-5 sm:gap-10'>
            <button
              className={`py-3 w-40 border rounded-xl px-6 border-black dark:border-transparent ${favorite ? 'bg-red-500 dark:bg-red-500 text-white' : 'dark:bg-PrimaryLight  bg-transparent text-black'} `}
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
            {filteredGames.map(renderCards)}
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
        <BackToTop />
      </div>
      <Dialog
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </main>
  )
}
