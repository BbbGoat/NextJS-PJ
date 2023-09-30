import { connectDB } from "@/app/util/database"
import { ObjectId } from "mongodb";
import DetailLink from "@/app/list/DetailLink";
import Comment from "./Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { notFound } from "next/navigation";

export default async function Detail(props) {
    const client = await connectDB;
    const db = client.db('forum')
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.slot) })
    console.log(props.params.slot)

    if (result === null) {
        return notFound()
    }
    
    // 로그인한 유저만 작성 가능
    let session = await getServerSession(authOptions);

    return(
        <>
            <DetailLink />
            <div>
                <h4>상세페이지</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
                <Comment _id={result._id.toString()} session={session} />
            </div>
            
        </>
    )
}