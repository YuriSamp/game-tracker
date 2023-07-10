
import React, { Dispatch, SetStateAction, useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

type Props = {
  setter?: Dispatch<SetStateAction<string>>
}

const PasswordInput = ({ setter }: Props) => {

  const [isHidden, setIsHidden] = useState(true)

  return (
    <div
      className=' mb-6 mt-1 relative'
    >
      <input
        className=' border outline-none border-black rounded-md p-2 w-full'
        onChange={(e) => setter && setter(e.target.value)}
        type={isHidden ? 'password' : 'text'}
      />
      {isHidden ?
        <BsEye
          className='absolute right-3 top-[12px] w-5 h-5'
          onClick={() => setIsHidden(prev => !prev)}
        />
        :
        <BsEyeSlash
          className='absolute right-3 top-[12px] w-5 h-5'
          onClick={() => setIsHidden(prev => !prev)}
        />
      }
    </div>
  )
}

export default PasswordInput
