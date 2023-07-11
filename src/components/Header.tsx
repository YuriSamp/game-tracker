import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Switch } from './Switch'
import Link from 'next/link'
import { MobileDialog } from './MobileDialog'
import { PacmanEats } from './Pacman'
import { getJWT } from '@/lib/auth/gettJWT'
import { destroyCookie } from 'nookies'

type Props = {
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

export const Header = ({ setDarkMode }: Props) => {

  const [isLoged, setIsLoged] = useState(false)

  useEffect(() => {
    const JWT = getJWT()
    if (JWT !== undefined) {
      setIsLoged(true)
    }
  }, [])

  const signOut = () => {
    destroyCookie(null, 'JWTAuth')
    setIsLoged(false)
  }


  return (
    <>
      <div className='py-6 w-full sm:min-w-[450px] md:min-w-[650px] flex items-center justify-between'>
        <div className='flex gap-2'>
          <span className='text-pink-500 font-Heading text-3xl flex flex-col md:flex-row gap-1 md:gap-3 items-center'>GAME<span className='text-blue-500'> TRACKER</span></span>
        </div>
        <div className='hidden sm:flex items-center gap-5 '>
          <Switch setDarkMode={setDarkMode} />
          {isLoged ?
            <button
              className='p-2 hidden sm:flex bg-transparent w-24 items-center justify-center border dark:bg-[#f9f5f2] text-black rounded-xl  border-black dark:border-transparent'
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            :
            <Link href={'/auth/signIn'} className='p-2 hidden sm:flex bg-transparent w-24 items-center justify-center border dark:bg-[#f9f5f2] text-black rounded-xl  border-black dark:border-transparent'>Sign In</Link>
          }
        </div>
        <div className='flex sm:hidden'>
          <MobileDialog setDarkMode={setDarkMode} />
        </div>
      </div>
      <PacmanEats />
      <h1 className='flex gap-5 text-center text-xl sm:text-3xl md:text-4xl xl:text-6xl font-Heading mt-5 '>
        <span className='text-red-500' >Find </span>
        <span className='text-orange-500' > your </span>
        <span className='text-green-500' >favorite </span>
        <span className='text-yellow-500'>game</span>
      </h1>
    </>
  )
}
