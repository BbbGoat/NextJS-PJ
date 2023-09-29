import { connectDB } from "../util/database";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic'

export default async function List() {

    const client = await connectDB;
    const db = client.db("forum");

    let result = await db.collection("post").find().toArray();
    // result의 _id 값 toString화 시켜주기!!!(하위 client 컴포넌트에서도 적용됨!)
    result = result.map((a)=>{
        a._id = a._id.toString()
        return a
    })

    return (
        <div className="list-bg">
            <ListItem result={result}/>
        </div>
    );
}