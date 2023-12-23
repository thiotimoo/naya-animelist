
import { Gabarito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


const font = Gabarito({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export const metadata = {
  title: 'Nayanime',
  description: 'Website Anime Indonesia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col min-h-screen`}>
        <Navbar />
        {children}
        <Footer/> 
      </body>
    </html>
  )
}
