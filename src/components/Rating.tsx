
import { GameRanked } from '@/types/gameApi'
import { Dispatch, SetStateAction } from 'react'
import { BsHeart, BsHeartFill, BsStar, BsStarFill } from 'react-icons/bs'

type Props = {
  favorite: boolean
  gameReview: number
  games: GameRanked[]
  setGames: Dispatch<SetStateAction<GameRanked[]>>
  id: number
}

export const Rating = ({ games, setGames, id, favorite, gameReview }: Props) => {
  const stars = new Array(4).fill('')

  const handleFavoriteGame = () => {
    const favoiriteGames = games.map(game => {
      if (game.id === id) {
        game.favorite = !game.favorite
      }
      return game
    }
    )
    setGames(favoiriteGames)
  }

  const handleRating = (value: number) => {
    const favoiriteGames = games.map(game => {
      if (game.id === id) {
        game.gameReview = value
      }
      return game
    }
    )
    setGames(favoiriteGames)
  }

  return (
    <div className='items-end flex justify-between w-full mt-3'>
      {favorite ?
        <BsHeartFill
          className='w-6 h-6 cursor-pointer text-red-600'
          onClick={handleFavoriteGame}
        />
        :
        <BsHeart
          className='w-6 h-6 cursor-pointer'
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
