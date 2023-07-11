
import { Dispatch, SetStateAction, } from 'react'
import { BsHeart, BsHeartFill, BsStar, BsStarFill } from 'react-icons/bs'
import { useAuth } from '@/hooks/useAuth';
import { Rating as RatingType } from '@/types/gameApi';

type Props = {
  favorite: boolean
  gameReview: number
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  id: number
  handleSavePreferences: (id: number, gamePreference: RatingType) => void
}

export const Rating = ({ id, favorite, gameReview, setModalIsOpen, handleSavePreferences }: Props) => {

  const stars = new Array(4).fill('')
  const { user } = useAuth()

  const handleFavoriteGame = () => {
    if (!user) {
      setModalIsOpen(true)
      return
    }

    handleSavePreferences(id, { gameReview, favorite: !favorite })
  }

  const handleRating = (value: number) => {
    if (!user) {
      setModalIsOpen(true)
      return
    }

    handleSavePreferences(id, { gameReview: value === gameReview ? 0 : value, favorite })
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
