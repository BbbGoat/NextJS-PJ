import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsnNzpGRTdgHmnthosQgwdpar-D-PpxFg",
  authDomain: "react-next-shop-app-5cc69.firebaseapp.com",
  projectId: "react-next-shop-app-5cc69",
  storageBucket: "react-next-shop-app-5cc69.appspot.com",
  messagingSenderId: "335776152948",
  appId: "1:335776152948:web:acbf713d0679f076c24021"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 앱과 firebase 연동 설정하는 부분 (위에서 import도 해주기)
export const auth = getAuth(app); // 인증
export const db = getFirestore(app); // 파이어스토어
export const storage = getStorage(app); // 스토리지

export default app;