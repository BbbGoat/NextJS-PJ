import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Cookies, cookies } from 'next/headers'
import DarkMode from './DartMode'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {

  // 현재 로그인한 유저이름, 이메일 등이 남음
  let session = await getServerSession(authOptions)
  console.log(session)

  // 쿠키 불러오기
  let res = cookies().get('mode')
  console.log(res)
  
  return (
    <html lang="en">
      <body className={ res != undefined && res.value == 'dark' ? "dark-mode" : '' }>
        <div className='navbar'>
          <Link href={'/'} className='logo'>Appleforum</Link>
          <Link href={'/list'}>List</Link>
          <Link href={'/write'}>Write</Link>
          <Link href={'/register'}>Member</Link>
          {
            session ? <span>Welcome {session.user.name}🤚 <LogoutBtn /></span> : <LoginBtn />
          }
          {/* <img src={session.user.image} alt='유저프로필' width={'50px'} height={'100%'} /> */}
          <DarkMode />
        </div>
        {children}
      </body>
    </html>
  )
}
