import { connectDB } from "@/app/util/database"

export default async function Detail() {
    const client = await connectDB;
    const db = client.db('forum')
    let result = await db.collection('post').findOne({ title : '제목3' })
    console.log(result)
    
    return(
        <>
            <div>
                <h4>상세페이지</h4>
                <h4>글제목</h4>
                <p>글내용</p>
            </div>
        </>
    )
}