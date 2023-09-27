import { connectDB } from "@/app/util/database"

export default async function handler(요청, 응답) {
    
    if ( 요청.method == 'POST' ) {
        const client = await connectDB;
        const db = client.db('forum')
        let result = await db.collection('post').insertOne(요청.body)
         
        return 응답.redirect(302, '/list')
    }
}