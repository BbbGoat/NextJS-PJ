'use client'

import { useRouter } from "next/navigation"

export default function DetailLink() {
    let router = useRouter()
    return(
        <button onClick={()=>{ router.back() }}>뒤로가기</button>
    )
}