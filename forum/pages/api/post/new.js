import { connectDB } from "@/app/util/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {

    // 현재 로그인한 유저 정보 가져오기
    let session = await getServerSession(요청, 응답, authOptions)
    // console.log(session)

    if (session) {
        요청.body.author = session.user.email
    }
    
    if ( 요청.method == 'POST' ) {
        const client = await connectDB;
        const db = client.db('forum')

        if (요청.body.title == '') {
            return 응답.status(500).json('제목 써야합니다')
        }
        
        let result = await db.collection('post').insertOne(요청.body)
         
        return 응답.redirect(302, '/list')
    }
}