import './globals.css'
import { Inter } from 'next/font/google'
import localFont from "next/font/local"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Game Tracker',
  description: 'A website to find your favorite game',
}

const fontHeading = localFont({
  src: "../fonts/arraySemiBold.otf",
  variable: "--array-heading",
})



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${fontHeading.variable}`}>{children}</body>
    </html>
  )
}
