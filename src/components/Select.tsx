
type Props = {
  onChange: (e: string) => void
  value: string
  options: string[]
}

export const Select = ({ onChange, options, value }: Props) => {
  return (
    <select
      className='py-3 bg-transparent w-40 border rounded-xl px-6 dark:bg-[#f9f5f2]  bg-[#020212] text-black border-black dark:border-transparent '
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {options.map(genre =>
        <option
          key={genre}
          value={genre}
          className='text-black'
        >
          {genre ? genre : 'Genre'}
        </option>)}
    </select>
  )
}
