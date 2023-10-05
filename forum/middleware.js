import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {

    const session = await getToken({req : request})
    console.log(session)
    
    // /write 페이지 접속시 로그인 확인
    if (request.nextUrl.pathname.startsWith('/write')) {
        if (session == null) {
            return NextResponse.redirect('http://localhost:3000/api/auth/signin')
        }
    }

    // /register 페이지 접속시 쿠키설정
    if (request.nextUrl.pathname.startsWith('/register')) {

        if (request.cookies.has('visited') === false) {
            // 쿠키 생성!
            const response = NextResponse.next()
            response.cookies.set({
                name : 'visited',
                value : 'true',
                maxAge : 3600,
            })
            return response
        }
        return NextResponse.next()
    }
    
}