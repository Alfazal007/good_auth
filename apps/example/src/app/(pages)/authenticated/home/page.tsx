"use client"

import { User, UserContext } from "@itachi__uchiha/goodauthfe"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

export default function() {
    const { user } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push("/auth/signin")
            return
        }
    }, [])

    return (
        <>
            Authenticated page
            {user}
            <User email="" name="" profile="" />
        </>
    )
}
