import { connectDB } from "@/app/util/database";
import bcrypt from 'bcrypt'

// register에서 회원가입 요청하는 API
export default async function handler(요청, 응답) {
    if (요청.method == 'POST') {
        const client = await connectDB;
        const db = client.db('forum')

        // 이메일 중복체크하기
        let chkEmail = await db.collection('user_cred').findOne({ email : 요청.body.email })

        if (chkEmail) {
            return 응답.status(500).json('이미 가입된 이메일주소')
        }

        // 빈칸 거절
        if (요청.body.name == '' || 요청.body.password == '' || 요청.body.email == '') {
            return 응답.status(500).json('작성란을 채워주세요.')
        }
        
        // 비번 암호화하기
        let hash = await bcrypt.hash(요청.body.password, 10)
        // console.log(hash, 요청.body)
        요청.body.password = hash
        
        await db.collection('user_cred').insertOne(요청.body);
        응답.status(200).json('가입성공')
    }
}