import Image from 'next/image'
import React from 'react'
import Pacman from '../../icon.png'
import Link from 'next/link'
import { RetturnButton } from '@/components/ReturnButton'

const SignIn = () => {
  return (
    <>
      <div className='self-start pl-10 pt-5'>
        <RetturnButton href='/' />
      </div>
      <section className='h-[90vh] flex flex-col justify-center'>
        <div className=' bg-white shadow-2xl rounded-xl flex flex-col py-5 px-7 text-center w-[350px]'>
          <div className='flex gap-3'>
            <Image src={Pacman} alt='Pacman' width={30} />
            <p className='text-3xl font-medium'>Game tracker</p>
          </div>
          <p className='my-7 font-medium'>Entre para ver suas preferencias</p>
          <label className='self-start'> Email</label>
          <input className='mb-6 mt-1 border outline-none border-black rounded-md p-2' />
          <label className='self-start'> Password</label>
          <input className='mb-6 mt-1 border outline-none border-black rounded-md p-2' />
          <button className='my-5 bg-yellow-300 py-2 rounded-md'>Continue</button>
          <p className='self-start'>No account? <Link href={'./signUp'} className='underline text-red-800'>Sign up</Link></p>
        </div>
      </section>
    </>
  )
}

export default SignIn