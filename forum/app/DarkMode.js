'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DarkMode(props){

    let router = useRouter()
    useEffect(()=>{
        let cookie = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0]
        // 쿠키가 비어있을 경우에만 작동!(=>덮어쓰기 방지)
        if (cookie == '') {
            // mode 쿠키 저장하기 (초기값)
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
            document.cookie = 'modeIcon=moon; max-age=' + (3600 * 24 * 400)
        }
    },[])
    
    // let modeIcon = ('; ' + document.cookie).split(`; modeIcon=`).pop().split(';')[0]
    // let modeIcon = (props.icon)
    let modeIcon = props.icon.value
    // console.log(props.icon.value)
    let [icon, setIcon] = useState(modeIcon === 'moon' ? '🌙' : '☀️');
    
    return (
        <span onClick={()=>{  

            let cookie = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0]

            // mode 쿠키 수정하기
            if (cookie == 'light') {
                document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
                document.cookie = 'modeIcon=sun; max-age=' + (3600 * 24 * 400)
                router.refresh()
                setIcon('☀️')
            } else {
                document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
                document.cookie = 'modeIcon=moon; max-age=' + (3600 * 24 * 400)
                router.refresh()
                setIcon('🌙')
            }
        }}>{modeIcon ? icon : "🌙"}</span>
    )
}