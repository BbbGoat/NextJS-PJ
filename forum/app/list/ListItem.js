'use client'

import Link from "next/link"

export default function ListItem({result}) {
    return(
        <>
            {
                result.map((a,i)=>(
                    <div className="list-item" key={i}>
                        <Link href={'/detail/'+a._id}>
                            <h4>{a.title}</h4>
                            <p>{a.content}</p>
                        </Link>
                        <Link href={'/edit/'+a._id}>✏</Link>
                        <span onClick={(e)=>{
                            fetch('/api/post/delete', {
                                method : 'DELETE',
                                body : a._id
                            })
                            .then((r)=>{return r.json()})
                            .then((r)=>{
                                e.target.parentElement.style.opacity = 0;
                                setTimeout(()=>{
                                    e.target.parentElement.style.display = 'none';
                                },1000);
                                console.log(r)
                            });
                        }}>🗑</span>
                    </div>
                ))
            }
        </>
    )
}