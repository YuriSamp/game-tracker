import { GameRanked, Rating as RatingType } from '@/types/gameApi'
import Image from 'next/image'
import { Dispatch, SetStateAction, useMemo } from 'react'
import stc from 'string-to-color'
import fontColorContrast from 'font-color-contrast'
import { useAuth } from '@/hooks/useAuth'
import Heart from './Heart'
import Star from './Star'

type gameProps = Pick<GameRanked, 'thumbnail' | 'title' | 'genre' | 'short_description' | 'id' | 'favorite' | 'gameReview'>

interface CardProps extends gameProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  handleSavePreferences: (id: number, gamePreference: RatingType) => void
}

export const Card = ({ thumbnail, title, genre, short_description, id, favorite, gameReview, setModalIsOpen, handleSavePreferences }: CardProps) => {

  const [bgColor, textColor] = useMemo(() => {
    const _bgColor = stc(genre)
    const _textColor: string = fontColorContrast(_bgColor)
    return [_bgColor, _textColor]
  }, [genre])

  const stars = new Array(4).fill('')
  const { user } = useAuth()

  const handleRating = (preference: RatingType) => {
    if (!user) {
      setModalIsOpen(true)
      return
    }

    handleSavePreferences(id, preference)
  }

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
        <Heart
          handleFavoriteGame={() => handleRating({ gameReview, favorite: !favorite })}
          favorite={favorite}
        />
        <div className='flex gap-1'>
          {stars.map((_, i) => (
            <Star
              key={i}
              favorite={favorite}
              gameReview={gameReview}
              handleRating={handleRating}
              rating={i + 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
