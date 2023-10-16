'use client'
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from '../login/Auth.module.scss'
import Input from "@/components/input/Input";
import Image from "next/image";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";
import Link from "next/link";
import LogoPath from '@/assets/colorful.svg';

const RegisterClient = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const registerUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
    }


    return (
        <>
            {isLoading && <Loader />}
            
            <section className={styles.page}>
                <div className={styles.container}>
                    <h1 className={styles.logo}>
                        <Image src={LogoPath} alt="logo" />
                    </h1>

                    <form onSubmit={registerUser} className={styles.form}>
                        {/* input */}
                        <Input
                            email
                            icon="letter"
                            id="email"
                            name="email"
                            label="이메일"
                            placeholder="아이디(이메일)"
                            className={styles.control}
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                        <Input 
                            password
                            icon="lock"
                            id="password"
                            name="password"
                            label="비밀번호"
                            placeholder="비밀번호"
                            className={styles.control}
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        
                        <Input 
                            password
                            icon="lock"
                            id="password"
                            name="password"
                            label="비밀번호 확인"
                            placeholder="비밀번호 확인"
                            className={styles.control}
                            value={cPassword}
                            onChange={(e)=>setCPassword(e.target.value)}
                        />
                        
                        
                        <div className={styles.buttonGroup}>
                            {/* Button */}
                            <Button
                                type="submit"
                                width="100%"
                            >
                                회원가입
                            </Button>
                            <Divider />

                            <Button
                                width="100%"
                                secondary
                            >
                                <Link href={'/login'}>
                                    로그인
                                </Link>
                            </Button>
                        </div>

                    </form>
                </div>
            </section>    
        </>
    )
};

export default RegisterClient;
