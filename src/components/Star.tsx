import React from 'react'
import { Rating } from '@/types/gameApi';
import { BsStar, BsStarFill } from 'react-icons/bs';

type Props = {
  handleRating: (preference: Rating) => void
  rating: number
  gameReview: number
  favorite: boolean
}

const Star = ({ handleRating, rating, gameReview, favorite }: Props) => {

  const fill = rating <= gameReview
  return (
    fill ?
      <BsStarFill
        className='w-6 h-6 text-yellow-400 cursor-pointer'
        onClick={() => handleRating({ gameReview: rating === gameReview ? 0 : rating, favorite })}
      />
      :
      <BsStar
        className='w-6 h-6 cursor-pointer'
        onClick={() => handleRating({ gameReview: rating === gameReview ? 0 : rating, favorite })}
      />
  )
}

export default Star
