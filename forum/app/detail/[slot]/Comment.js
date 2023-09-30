"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
    let [comment, setComment] = useState("");
    let [data, setData] = useState([]);
    let session = props.session;

    // 새로고침해서 GET요청시 리스트 받아오는 코드
    useEffect(() => {
        fetch("/api/comment/list?id=" + props._id)
            .then((r) => r.json())
            .then((result) => {
                setData(result);
            });
    }, []);

    if (!session)
        return (
            <div>
                <h4>✨ 댓글목록보여줄부분</h4>
                {data.length > 0 ? data.map((a, i) => <p key={i}>{a.content}</p>) : "댓글 없음"}
                <input placeholder="로그인시 이용 가능" disabled />
                <button>댓글전송</button>
            </div>
        );
    else
        return (
            <div>
                <h4>✨ 댓글목록보여줄부분</h4>
                {
                    data.length > 0 ? 
                    data.map(
                        (a, i) => <p key={i}>{a.content}</p>
                    ) 
                    : "댓글 없음"
                }
                <input
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        // 빈값 방지
                        if (comment === "") {
                            alert("빈값 금지!");
                        } else {
                            fetch("/api/comment/new", {
                                method: "POST",
                                body: JSON.stringify({ comment: comment, _id: props._id }),
                            })
                            .then((r) => r.json())
                            // 입력시 바로바로 state 변경!
                            .then((result) => setData(result) );
                        }
                    }}>댓글전송
                </button>
            </div>
        );
}
