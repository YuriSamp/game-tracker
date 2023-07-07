import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface Props {
  href: string
}

export function RetturnButton({ href }: Props) {
  return (
    <Link href={href} className="flex items-center p-3 rounded-full bg-white">
      <AiOutlineArrowLeft className="h-6 w-6" />
    </Link>
  )
}
