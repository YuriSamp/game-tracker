type Props = {
  value: string
  onChange: (e: string) => void
  placeholder: string
}

export const Input = ({ onChange, placeholder, value }: Props) => {
  return (
    <input
      className='w-[300px] sm:w-[450px] md:w-[650px] border border-black dark:border-transparent  dark:bg-PrimaryLight  text-neutral-700 rounded-3xl bg-transparent h-14 px-5 outline-none text-2xl '
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus={true}
    />
  )
}
