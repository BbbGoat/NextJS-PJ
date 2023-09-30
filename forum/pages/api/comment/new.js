import { connectDB } from "@/app/util/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {

    // 현재 로그인한 유저 정보 가져오기
    let session = await getServerSession(요청, 응답, authOptions)
    
    if ( 요청.method == 'POST' ) {
        const client = await connectDB;
        const db = client.db('forum')
        
        요청.body = JSON.parse(요청.body)

        if (!session) return 응답.status(500).json('로그인해주세요!')
        
        // if (요청.body.comment == '') {
        //     return 응답.status(500).json('내용을 입력해주세요.')
        // }

        
        let 저장할거 = {
            content : 요청.body.comment,
            parent : new ObjectId(요청.body._id),
            author : session.user.email
        }

        console.log('쿼리나오나?', 요청.query)
        
        let result = await db.collection('comment').insertOne(저장할거)
        let find = await db.collection('comment').find({ parent : 저장할거.parent }).toArray()
         
        return 응답.status(200).json(find)
    }
}