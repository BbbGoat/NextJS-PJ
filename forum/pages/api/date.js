export default function handler(요청,응답) {
    let a = new Date();
    응답.status(200).json(a)
}