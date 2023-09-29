import { connectDB } from "../util/database";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic'

export default async function List() {

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection("post").find().toArray();
    // console.log(result[0]._id)

    return (
        <div className="list-bg">
            <ListItem result={result}/>
        </div>
    );
}