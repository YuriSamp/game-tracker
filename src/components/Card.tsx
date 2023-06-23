import { Game } from '@/types/gameApi'
import Image from 'next/image'
import { useMemo } from 'react'
import stc from 'string-to-color'
import fontColorContrast from 'font-color-contrast'

type Props = Pick<Game, 'thumbnail' | 'title' | 'genre' | 'short_description'>

export const Card = ({ thumbnail, title, genre, short_description }: Props) => {

  const [bgColor, textColor] = useMemo(() => {
    const _bgColor = stc(genre)
    const _textColor: string = fontColorContrast(_bgColor)
    return [_bgColor, _textColor]
  }, [genre])


  return (
    <div className='w-[350px] flex flex-col items-center rounded-xl py-5 px-5 text-lg bg-white shadow-xl dark:bg-[#FDFDED] text-black relative`'>
      <div className=' flex flex-col items-start'>
        <Image src={thumbnail} alt={title} width={300} height={200} className='rounded-2xl self-center w-full' />
        <div className='pt-3'>
          <p className='text-xl font-MontSerrat font-bold max-w-[300px]  '>{title}</p>
        </div>
        <div
          style={{ backgroundColor: bgColor, color: textColor }}
          className={`rounded-lg text-sm p-2 my-2`}>
          {genre}
        </div>
        <p>
          {short_description}
        </p>
      </div>
    </div>
  )
}
