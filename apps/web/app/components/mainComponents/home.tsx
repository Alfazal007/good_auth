"use client"

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export function Home() {
    const router = useRouter()
    useEffect(() => {
        const token = Cookies.get('accessToken');
        const email = Cookies.get('email');
        const id = Cookies.get('id');
        if (!token || !email || !id) {
            router.push("/auth/signin")
            return
        }
    }, [])

    return (
        <>
            Hello World!
        </>
    )
}
