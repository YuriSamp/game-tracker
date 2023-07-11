import React, { Dispatch, SetStateAction, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { Switch } from './Switch';

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

type SidebarProps = {
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

export const MobileDialog = ({ setDarkMode }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex sm:hidden'>
      <AiOutlineMenu className='w-7 h-7' onClick={() => setIsOpen(true)} />
      {isOpen &&
        <DialogComponent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setDarkMode={setDarkMode}
        />
      }
    </div>
  )
}

const DialogComponent = ({ isOpen, setIsOpen, setDarkMode }: Props) => (
  <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 text-black" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[30%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <div className='flex justify-between'>
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Configs
          </Dialog.Title>
          <Dialog.Close asChild>
            <AiOutlineClose className='h-6 w-6 cursor-pointer text-black' />
          </Dialog.Close>
        </div>
        <div className='mt-4 flex flex-col gap-5 text-black text-lg'>
          <Link href={'/auth/signIn'} >Sign in</Link>
          <Link href={'/auth/signIn'} >Sign Up</Link>
          <Switch setDarkMode={setDarkMode} />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
