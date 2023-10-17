'use client'
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import InnerHeader from "../innerHeader/InnerHeader";

const Header = () => {
  
  const router = useRouter();
  const pathname = usePathname();

  const [displayName, setDisplayName] = useState('');

  useEffect(()=>{
    
    // 로그인 발생하면 로그인한 유저 정보 들어옴
    onAuthStateChanged(auth, (user) => {
      // 로그인함
      if (user) {

        // [ 아이디/패스워드 로그인한 경우 ]
        if (user.displayName === null) {
          // 1. email에서 @기준으로 앞부분만 남기기
          const u1 = user.email.substring(0, user.email.indexOf('@'));
          // 2. 첫글자는 대문자로 바꾼 u1 + 첫글자 지우고 나머지 뒷부분 남긴 u1
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          // 3. state에 설정
          setDisplayName(uName);
        }
        // [ 구글로그인한 경우 ]
        else {
          setDisplayName(user.displayName);
        }

        // 유저 정보를 리덕스 스토어에 저장하기

      }
      // 로그아웃함
      else {
        setDisplayName('');
        // 유저 정보를 리덕스 스토어에서 지우기
      }
    })
  }, [])

  const logoutUser = (e) => {
    signOut(auth)
    .then(()=>{
      toast.success('로그아웃 되었습니다.');
      router.push('/');
    })
    .catch((error)=>{
      toast.error(error.message);
    })
  };

  if (pathname === '/login' || pathname === '/register' || pathname === '/reset' ) {
    return null;
  }

  return (
      <header className={styles.loginBar}>
          <ul className={styles.list}>
              <li className={styles.item}>
                  <Link href={"/login"}>로그인</Link>
              </li>
              <li className={styles.item}>
                  <Link href={"/admin/dashboard"}>관리자</Link>
              </li>
              <li className={styles.item}>
                  <Link href={"/order-history"}>주문 목록</Link>
              </li>
              <li className={styles.item}>
                  <Link href={"/"} onClick={logoutUser}>
                      로그아웃
                  </Link>
              </li>
              <li className={styles.item}>
                  <Link href={"/"}>
                      제휴 마케팅
                  </Link>
              </li>
              <li className={styles.item}>
                  <Link href={"/"}>
                      쿠팡 플레이
                  </Link>
              </li>
              <li className={styles.item}>
                  <Link href={"/"}>
                      고객센터
                  </Link>
              </li>
          </ul>
          {
            pathname.startsWith('/admin') ?
            null :
            <InnerHeader />
          }
      </header>
  );
};

export default Header;
