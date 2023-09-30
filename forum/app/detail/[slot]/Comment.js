"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {

    let [comment, setComment] = useState('')
    let [data, setData] = useState([])

    // 새로고침해서 GET요청시 리스트 받아오는 코드
    useEffect(()=>{
        fetch('/api/comment/list?id='+props._id)
        .then(r=>r.json())
        .then((result)=>{
            setData(result)
        })
    }, [])
    
    return (
        <div>
            <div>댓글목록보여줄부분</div>
            {
                data.length > 0 ?
                data.map((a,i)=>(
                    <p key={i}>{a.content}</p>
                ))
                : '댓글 없음'
            }
            <input onChange={(e)=>{ setComment(e.target.value) }}/>
            <button onClick={()=>{
                fetch('/api/comment/new', {
                    method : 'POST', 
                    body : JSON.stringify({comment : comment, _id : props._id})
                })
                .then((r)=>r.json())
                // 입력시 바로바로 state 변경!
                .then((result)=>setData(result))
            }}>댓글전송</button>
        </div>
    );
}
