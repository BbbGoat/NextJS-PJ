import { connectDB } from "@/app/util/database"
import { ObjectId } from "mongodb";

export default async function Edit(props) {

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection("post").findOne({ _id : new ObjectId(props.params.id) });

    return (
      <div className="p-20">
        <h4>수정페이지</h4>
        <form action="어쩌구" method="POST">
          <input name="title" defaultValue={result.title} />
          <input name="content" defaultValue={result.content} />
          <button type="submit">전송</button>
        </form>
      </div>
    )
} 