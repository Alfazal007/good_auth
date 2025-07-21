"use client"

import { UserContext } from "@itachi__uchiha/goodauth/client"
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
        </>
    )
}
