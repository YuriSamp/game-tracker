import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';
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
      <ToastContainer />
      {children}
    </main>
  )
}

export default AuthLayout
