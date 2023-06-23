import React, { Dispatch, SetStateAction } from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { BsMoon, BsSun } from 'react-icons/bs'

type Props = {
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

export const Switch = ({ setDarkMode }: Props) => (
  <form>
    <div className="flex items-center gap-2">
      <label className="text-white leading-none pr-[15px]" htmlFor="dark-mode">
        <BsMoon className='w-7 h-7 fill-blue-500' />
      </label>
      <RadixSwitch.Root
        className="w-14 h-7 bg-blue-500 rounded-full relative  focus:shadow-black data-[state=checked]:bg-yellow-500 outline-none cursor-default"
        id="airplane-mode"
        onClick={() => setDarkMode(prev => !prev)}
      >
        <RadixSwitch.Thumb className="block w-6 h-6 bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[30px] " />
      </RadixSwitch.Root>
      <label className="text-white leading-none pl-[15px]" htmlFor="light-mode">
        <BsSun className='w-7 h-7 fill-yellow-500' />
      </label>
    </div>
  </form>
);
