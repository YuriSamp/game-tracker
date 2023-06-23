import { Game } from '@/types/gameApi'
import Image from 'next/image'

type Props = Pick<Game, 'developer' | 'thumbnail' | 'title' | 'publisher' | 'release_date' | 'genre'>

export const Card = ({ developer, thumbnail, title, genre, publisher, release_date }: Props) => {

  return (
    <div
      className='w-[350px] flex flex-col items-center rounded-xl py-5 px-3 text-lg bg-white shadow-xl dark:bg-[#FDFDED] text-black relative`'>
      <div className=' flex flex-col items-center'>
        <Image src={thumbnail} alt={title} width={300} height={200} className='rounded-2xl' />
        <div className='pt-3'>
          <p className='text-2xl font-MontSerrat text-center max-w-[300px] h-16 '>{title}</p>
        </div>
        <div className='flex py-2'>
          <div className='flex flex-col w-40 items-center text-center'>
            <p>Publisher</p>
            <p className='text-xl font-medium font-MontSerrat text-center'>{publisher}</p>
          </div>
          <div className='flex flex-col w-40 items-center'>
            <p>Developer</p>
            <p className='text-xl font-medium font-MontSerrat text-center h-14'>{developer}</p>
          </div>
        </div>
        <div className='flex items-center py-2'>
          <div className='flex flex-col w-40 items-center py-1'>
            <p>Genre</p>
            <p className='text-xl text-center font-medium font-MontSerrat'>{genre}</p>
          </div>
          <div className='flex flex-col w-40 items-center'>
            <p>Release</p>
            <p className='text-xl font-medium font-MontSerrat text-center'>{release_date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
