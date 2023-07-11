import React, { Dispatch, SetStateAction } from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'


type Props = {
  ranked: boolean
  setRanked: Dispatch<SetStateAction<boolean>>
}

export const RatingFilter = ({ ranked, setRanked }: Props) => {

  return (
    <div className='w-full sm:min-w-[450px] md:min-w-[650px] flex justify-end'>
      <button
        className='mt-8 flex items-center gap-3'
        onClick={() => setRanked(prev => !prev)}
      >
        {ranked ? <BsArrowUp /> : <BsArrowDown />}
        <p className='text-2xl font-mono'>Rating</p>
      </button>
    </div>
  )
}
