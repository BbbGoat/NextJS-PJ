import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {

    const session = await getToken({req : request})
    console.log(session)
    
    if (request.nextUrl.pathname.startsWith('/list')) {
        console.log(request.headers.get('sec-ch-ua-platform'))
        console.log(request.headers.get('sec-ch-ua-platform'))
        return NextResponse.next()
    }
    
} 