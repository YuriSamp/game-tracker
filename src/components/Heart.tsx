
type Props = {
  favorite: boolean
  handleFavoriteGame: () => void
}

const Heart = ({ favorite, handleFavoriteGame }: Props) => {

  return (
    <div className='relative w-6 h-6 cursor-pointer'
      onClick={() => handleFavoriteGame()}
    >
      <div
        className={` scale-75 absolute top-[-35px] left-[-40px] ${!favorite ? 'heart' : 'heart-blank'}  `}
      />
    </div>
  )
}

export default Heart
