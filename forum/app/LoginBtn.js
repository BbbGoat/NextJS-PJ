'use client'

import { signIn, signOut } from 'next-auth/react'

export default function LoginBtn() {
    return(
        // 실행시 로그인
        <button onClick={()=>{ signIn() }}>로그인</button>
    )
}