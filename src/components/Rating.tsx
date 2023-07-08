
import { GameRanked } from '@/types/gameApi'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { BsHeart, BsHeartFill, BsStar, BsStarFill } from 'react-icons/bs'

type Props = {
  favorite: boolean
  gameReview: number
  games: GameRanked[]
  setGames: Dispatch<SetStateAction<GameRanked[]>>
  id: number
}

export const Rating = ({ games, setGames, id, favorite }: Props) => {

  const [rating, setRating] = useState(0)
  const starsFill = new Array(4).fill('')

  const handleFavoriteGame = () => {
    const favoiriteGames = games.map(game => {
      if (game.id === id) {
        game.favorite = !game.favorite
      }
      return game
    }
    )
    console.log(games.filter(game => game.id === id))
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
        {starsFill.map((_, i) => (
          i + 1 > rating ?
            <BsStar
              key={i}
              className='w-6 h-6 cursor-pointer'
              onClick={() => setRating(i + 1)}
            />
            :
            <BsStarFill
              key={i}
              className='w-6 h-6 text-yellow-400 cursor-pointer'
              onClick={() => setRating(i + 1)}
            />
        ))}
      </div>
    </div>
  )
}
