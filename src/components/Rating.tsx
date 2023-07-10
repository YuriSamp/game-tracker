
import { GameRanked } from '@/types/gameApi'
import { Dispatch, SetStateAction, } from 'react'
import { BsHeart, BsHeartFill, BsStar, BsStarFill } from 'react-icons/bs'
import { useDb } from '@/hooks/useDb';
import { getJWT } from '@/lib/auth/gettJWT';

type Props = {
  favorite: boolean
  gameReview: number
  games: GameRanked[]
  setGames: Dispatch<SetStateAction<GameRanked[]>>
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  id: number
}

export const Rating = ({ games, setGames, id, favorite, gameReview, setModalIsOpen }: Props) => {

  const stars = new Array(4).fill('')
  const { addToDb } = useDb()

  const handleFavoriteGame = () => {
    const JWT = getJWT()
    if (JWT === undefined) {
      setModalIsOpen(true)
      return
    }

    const favoiriteGames = games.map(game => {
      if (game.id === id) {
        game.favorite = !game.favorite
      }
      return game
    })

    setGames(favoiriteGames)
    const favorite = favoiriteGames.filter(game => game.id === id)[0].favorite
    addToDb(favorite, gameReview, id, JWT)
  }

  const handleRating = (value: number) => {

    const JWT = getJWT()
    if (JWT === undefined) {
      setModalIsOpen(true)
      return
    }

    const favoiriteGames = games.map(game => {
      if (game.id === id) {
        game.gameReview = value
      }
      return game
    })

    setGames(favoiriteGames)
    const gameReview = favoiriteGames.filter(game => game.id === id)[0].gameReview
    addToDb(favorite, gameReview, id, JWT)
  }

  return (
    <div className='items-end flex justify-between w-full mt-3'>
      {favorite ?
        <BsHeartFill
          className='w-6 h-6 cursor-pointer text-red-600 hover:animate-wiggle'
          onClick={handleFavoriteGame}
        />
        :
        <BsHeart
          className='w-6 h-6 cursor-pointer hover:animate-wiggle'
          onClick={handleFavoriteGame}
        />
      }
      <div className='flex gap-1'>
        {stars.map((_, i) => (
          i + 1 > gameReview ?
            <BsStar
              key={i}
              className='w-6 h-6 cursor-pointer'
              onClick={() => handleRating(i + 1)}
            />
            :
            <BsStarFill
              key={i}
              className='w-6 h-6 text-yellow-400 cursor-pointer'
              onClick={() => handleRating(i + 1)}
            />
        ))}
      </div>
    </div>
  )
}
