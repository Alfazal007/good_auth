"use client"

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Nav from './Nav';

export function Home() {
    const router = useRouter()

    useEffect(() => {
        const email = Cookies.get('email');
        const id = Cookies.get('id');
        if (!email || !id) {
            router.push("/auth/signin")
            return
        }
    }, [])

    return (
        <>
            <Nav />
        </>
    )
}
