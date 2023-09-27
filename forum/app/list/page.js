import Link from "next/link";
import { connectDB } from "../util/database";
import DetailLink from "./DetailLink";

export default async function List() {

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection("post").find().toArray();
    console.log(result[0]._id)

    return (
        <div className="list-bg">
            {
                result.map((a,i)=>(
                    <div className="list-item" key={i}>
                        <Link href={'/detail/'+a._id}>
                            <h4>{a.title}</h4>
                            <p>{a.content}</p>
                            {/* <DetailLink /> */}
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}