"use client"

import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import Pacman from '../../icon.png'
import { RetturnButton } from '@/components/ReturnButton'
import { signUpForm } from '@/lib/validations/authForm'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import PasswordInput from '@/components/PasswordInput'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { createUser, error } = useAuth()
  const router = useRouter()

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault()
    const credentials = signUpForm.parse({ email, password, passwordConfirm })
    await createUser(credentials.email, credentials.password)
    if (error) {
      toast.error(error)
      return
    }
    router.push('/')
  }


  return (
    <>
      <div className='self-start pl-10 pt-5'>
        <RetturnButton href='./signIn' />
      </div>
      <form className='h-[90vh] flex flex-col justify-center' onSubmit={handleAuth}>
        <div className=' bg-white shadow-2xl rounded-xl flex flex-col py-5 px-7 text-center w-[350px]'>
          <div className='flex gap-3'>
            <Image src={Pacman} alt='Pacman' width={30} />
            <p className='text-3xl font-medium'>Game tracker</p>
          </div>
          <p className='my-7 font-medium'>Crie um usuario para salvar suas preferencias</p>
          <label className='self-start'> Email</label>
          <input
            className='mb-6 mt-1 border outline-none border-black rounded-md p-2'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='self-start'> Password</label>
          <input
            className='mb-6 mt-1 border outline-none border-black rounded-md p-2'
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className='self-start'> Confirm Password</label>
          <input
            className='mb-6 mt-1 border outline-none border-black rounded-md p-2'
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button className='my-5 bg-yellow-300 py-2 rounded-md'>Continue</button>
        </div>
      </form>
    </>
  )
}

export default SignUp
