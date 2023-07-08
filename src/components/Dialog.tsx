import { Dispatch, SetStateAction } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import Link from 'next/link';

type Props = {
  modalIsOpen: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

export const Dialog = ({ setModalIsOpen, modalIsOpen, }: Props) => (
  <AlertDialog.Root open={modalIsOpen} onOpenChange={setModalIsOpen}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow data-[state=open]:blur-xl fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none text-black ">
        <AlertDialog.Title className="m-0 text-[17px] font-medium">
          You need to login first
        </AlertDialog.Title>
        <AlertDialog.Description className=" mt-4 mb-5 text-lg leading-normal">
          Seems like you tried to give a game a score or save in your favorite,
          but first you need an account to make this actions
        </AlertDialog.Description>
        <div className="flex justify-center gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className=" bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Continue
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Link
              className=" bg-[#B3202C] text-white focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              href={'./auth/signIn'}
            >
              Sign in
            </Link>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
