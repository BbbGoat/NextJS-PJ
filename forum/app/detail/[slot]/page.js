import { connectDB } from "@/app/util/database"
import { ObjectId } from "mongodb";
import DetailLink from "@/app/list/DetailLink";

export default async function Detail(props) {
    const client = await connectDB;
    const db = client.db('forum')
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.slot) })
    console.log(props.params.slot)

    return(
        <>
            <DetailLink />
            <div>
                <h4>상세페이지</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
            </div>
        </>
    )
}