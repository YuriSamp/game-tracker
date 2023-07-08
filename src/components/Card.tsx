import { GameRanked } from '@/types/gameApi'
import Image from 'next/image'
import { Dispatch, SetStateAction, useMemo } from 'react'
import stc from 'string-to-color'
import fontColorContrast from 'font-color-contrast'
import { Rating } from './Rating'

type gameProps = Pick<GameRanked, 'thumbnail' | 'title' | 'genre' | 'short_description' | 'id' | 'favorite' | 'gameReview'>

interface CardProps extends gameProps {
  games: GameRanked[]
  setGames: Dispatch<SetStateAction<GameRanked[]>>
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

export const Card = ({ thumbnail, title, genre, short_description, games, setGames, id, favorite, gameReview, setModalIsOpen }: CardProps) => {

  const [bgColor, textColor] = useMemo(() => {
    const _bgColor = stc(genre)
    const _textColor: string = fontColorContrast(_bgColor)
    return [_bgColor, _textColor]
  }, [genre])


  return (
    <div className='w-[300px] xl:w-[350px] flex flex-col items-center justify-between rounded-xl py-5 px-5 text-lg bg-white shadow-xl dark:bg-[#FDFDED] text-black relative select-none`'>
      <div className='flex flex-col items-start'>
        <Image src={thumbnail} alt={title} width={300} height={200} className='rounded-2xl self-center w-full select-none' />
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
      <div className='items-end flex justify-between w-full mt-3'>
        <Rating
          id={id}
          games={games}
          setGames={setGames}
          favorite={favorite}
          gameReview={gameReview}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
    </div>
  )
}
