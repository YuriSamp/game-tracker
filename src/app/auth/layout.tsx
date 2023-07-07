import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main
      className='flex flex-col min-h-screen  items-center  text-black'
      style={{
        backgroundImage: `url('/login-bg.jpg')`,
      }}
    >
      {children}
    </main>
  )
}

export default AuthLayout
