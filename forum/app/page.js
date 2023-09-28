import { connectDB } from "./util/database"

// 캐싱 제한시간 (ISR)
export const revalidate = 60;

export default async function Home() {

  const client = await connectDB;
  const db = client.db('forum')
  let result = await db.collection('post').find().toArray()
  console.log(result)

  // await fetch('/URL', {cache : 'force-cache'})
  
  return (
    <>
      <div>안녕</div>
    </>
  )
}