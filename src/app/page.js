'use client'

import Game from "@/components/Game"
import Start from "@/components/Start"
import localFont from 'next/font/local'
import { useEffect, useState } from "react"

const clearSans = localFont({
  src: [
    {
      path: './styles/fonts/clear-sans.regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './styles/fonts/clear-sans.bold.ttf',
      weight: '700',
      style: 'normal',
    }],
  variable: '--font-clearSans'
})

export default function Home() {

  const [reset, setReset] = useState(false)

  useEffect(() => {
    setReset(false)
  })

  return (
    <main className={`${clearSans.variable} flex items-center justify-center min-h-screen flex-col gap-8`}>
      <Start onClick={() => {
        setReset(true)
      }} />
      {!reset && <Game />}
    </main>
  )
}
