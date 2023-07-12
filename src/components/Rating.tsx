
import { Dispatch, SetStateAction, } from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { useAuth } from '@/hooks/useAuth';
import { Rating as RatingType } from '@/types/gameApi';
import Heart from './Heart';

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


  const handleRating = (preference: RatingType) => {
    if (!user) {
      setModalIsOpen(true)
      return
    }

    handleSavePreferences(id, preference)
  }

  return (
    <div className='items-end flex justify-between w-full mt-3'>
      <Heart
        handleFavoriteGame={() => handleRating({ gameReview, favorite: !favorite })}
        favorite={favorite}
      />
      <div className='flex gap-1'>
        {stars.map((_, i) => (
          i + 1 > gameReview ?
            <BsStar
              key={i}
              className='w-6 h-6 cursor-pointer'
              onClick={() => handleRating({ gameReview: i + 1 === gameReview ? 0 : i + 1, favorite })}
            />
            :
            <BsStarFill
              key={i}
              className='w-6 h-6 text-yellow-400 cursor-pointer'
              onClick={() => handleRating({ gameReview: i + 1 === gameReview ? 0 : i + 1, favorite })}
            />
        ))}
      </div>
    </div>
  )
}
