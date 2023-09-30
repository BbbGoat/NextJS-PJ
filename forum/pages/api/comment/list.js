import { connectDB } from "@/app/util/database"
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db('forum')

    console.log(요청.query)
    
    let result = await db.collection('comment').find({ parent : new ObjectId(요청.query.id) }).toArray()
    return 응답.status(200).json(result)

}