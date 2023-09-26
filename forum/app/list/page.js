import { connectDB } from "../util/database";

export default async function List() {

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection("post").find().toArray();

    return (
        <div className="list-bg">
            {
                result.map((a,i)=>(
                    <div className="list-item">
                        <h4>{a.title}</h4>
                        <p>{a.content}</p>
                    </div>
                ))
            }
        </div>
    );
}
