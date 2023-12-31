
type Props = {
  onClick: () => void
  children: string
}

export const Button = ({ onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className='py-3 bg-transparent w-40 border dark:bg-PrimaryLight text-black rounded-xl px-6 border-black dark:border-transparent'
    >
      {children}
    </button>
  )
}
