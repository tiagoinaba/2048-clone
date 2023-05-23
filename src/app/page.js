import Game from "@/components/Game"
import localFont from 'next/font/local'

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
  return (
    <main className={`${clearSans.variable} flex items-center justify-center min-h-screen`}>
      <Game />
    </main>
  )
}
