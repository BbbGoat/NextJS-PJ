import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Write() {

    // 로그인한 유저만 작성 가능
    let session = await getServerSession(authOptions);

    if (!session) return (<h4>로그인하세요</h4>);
    else {
        return (
            <div className="p-20">
                <h4>글 작성</h4>
                <form action="/api/post/new" method="POST">
                    <input name="title" placeholder="글제목" />
                    <input name="content" placeholder="글내용" />
                    <button type="submit">전송</button>
                </form>
            </div>
        );
    }
}
