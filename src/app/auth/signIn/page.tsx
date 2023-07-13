"use client"

import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import Pacman from '../../icon.png'
import Link from 'next/link'
import { RetturnButton } from '@/components/ReturnButton'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { signInForm, signInFormType } from '@/lib/validations/authForm'
import { toast } from 'react-toastify'
import PasswordInput from '@/components/PasswordInput'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth()
  const router = useRouter()


  const handleAuth = async (e: FormEvent) => {
    e.preventDefault()
    const credentials = signInForm.safeParse({ email, password })
    if (!credentials.success) {
      const fieldErrors = credentials.error.formErrors.fieldErrors
      const errorArray: readonly string[] = Object.keys(fieldErrors)
      toast.error(fieldErrors[errorArray.at(0) as keyof signInFormType]?.at(0))
      return
    }

    await login(credentials.data.email, credentials.data.password)
    if (error) {
      toast.error(error.message)
      return
    }
    // router.push('/')
  }

  return (
    <>
      <div className='self-start pl-10 pt-5'>
        <RetturnButton href='/' />
      </div>
      <form className='h-[90vh] flex flex-col justify-center'
        onSubmit={handleAuth}>
        <div className=' bg-white shadow-2xl rounded-xl flex flex-col py-5 px-4 sm:px-7 text-center w-[290px] sm:w-[350px]'>
          <div className='flex gap-3'>
            <Image src={Pacman} alt='Pacman' width={30} />
            <p className='text-3xl font-medium'>Game tracker</p>
          </div>
          <p className='my-7 font-medium'>Sign In to see your favorite games</p>
          <label className='self-start'> Email</label>
          <input
            className='mb-6 mt-1 border outline-none border-black rounded-md p-2'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='self-start'> Password</label>
          <PasswordInput
            setter={setPassword}
          />
          <button className='my-5 bg-yellow-300 py-2 rounded-md'>Sign In</button>
          <p className='self-start'>Dont have an account? <Link href={'./signUp'} className='underline text-red-800'>Sign up</Link></p>
        </div>
      </form>
    </>
  )
}

export default SignIn
