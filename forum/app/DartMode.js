'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DarkMode(){

    let router = useRouter()
    useEffect(()=>{
        let cookie = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
        // 쿠키가 비어있을 경우에만 작동!(=>덮어쓰기 방지)
        if (cookie == '') {
            // mode 쿠키 저장하기 (초기값)
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
            document.cookie = 'modeIcon=🌙; max-age=' + (3600 * 24 * 400)
        }
    },[])
    
    let modeIcon = ('; '+document.cookie).split(`; modeIcon=`).pop().split(';')[0]
    let [icon, setIcon] = useState(modeIcon);
    
    return (
        <span onClick={()=>{  

            let cookie = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]

            if (cookie == 'light') {
                // mode 쿠키 수정하기
                document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
                document.cookie = 'modeIcon=☀️; max-age=' + (3600 * 24 * 400)
                router.refresh()
                setIcon('☀️')
            } else {
                document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
                document.cookie = 'modeIcon=🌙; max-age=' + (3600 * 24 * 400)
                router.refresh()
                setIcon('🌙')
            }
        }}>{modeIcon ? icon : "🌙"}</span>
    )
}