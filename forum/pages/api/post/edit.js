import { connectDB } from "@/app/util/database"
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
    
    if ( 요청.method == 'POST' ) {
        const client = await connectDB;
        const db = client.db('forum')

        if (요청.body.title == '') {
            return 응답.status(500).json('제목 써야합니다')
        }
        
        let 바꿀거 = { title : 요청.body.title, content : 요청.body.content }
        let result = await db.collection('post').updateOne({ _id : new ObjectId(요청.body._id) }, { $set : 바꿀거 })
         
        응답.redirect(302, '/list')
    }
}