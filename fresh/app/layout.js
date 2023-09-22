import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
        <div className="navbar">
          <Link href="/">home</Link>
          <Link href="/list">list페이지</Link>
          <Link href="/cart">cart페이지</Link>
        </div>

        {/* page.js가 들어가는 부분 */}
        {children}
          
      </body>
    </html>
  )
}
