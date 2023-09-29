'use client'

import { signIn, signOut } from 'next-auth/react'

export default function LogoutBtn(props) {
    return(
        // 실행시 로그인
        <button onClick={()=>{ signOut() }}>로그아웃</button>
    )
}