import React, { Dispatch, SetStateAction } from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

type Props = {
  ranked: boolean
  setRanked: Dispatch<SetStateAction<boolean>>
}

export const RatingFilter = ({ ranked, setRanked }: Props) => {

  return (
    <button
      className='mt-8 px-6 sm:px-40  xl:px-72 2xl:px-96 flex items-center gap-3 self-end '
      onClick={() => setRanked(prev => !prev)}
    >
      {ranked ? <BsArrowUp /> : <BsArrowDown />}
      <p className='text-2xl font-mono'>Rating</p>
    </button>
  )
}
