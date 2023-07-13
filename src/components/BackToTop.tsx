import React, { useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'

export const BackToTop = () => {

  const backToTOp = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const HandleScroll = () => {
      if (window.scrollY > 700) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", HandleScroll)

    return () => {
      window.removeEventListener("scroll", HandleScroll)
    }
  }, [])

  return (
    <div
      className={`w-14 h-14 rounded-full fixed right-10 bottom-10 dark:bg-PrimaryLight hidden bg-white shadow-xl ${isScrolled ? 'sm:flex' : ''} justify-center items-center cursor-pointer`}
      onClick={backToTOp}
    >
      <AiOutlineArrowUp className='w-6 h-6 dark:text-black text-black' />
    </div>
  )
}
