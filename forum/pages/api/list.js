import { connectDB } from "@/app/util/database"

export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db('forum')

    // GET 요청시
    let result = await db.collection('post').find().toArray()
    응답.status(200).json('리스트페이지')

}