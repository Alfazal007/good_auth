"use client"

import { getUser, User } from "@itachi__uchiha/goodauthfe"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function() {
    const router = useRouter()
    const [userCurrent, setUserCurrent] = useState<{
        email: string;
        token: string;
        id: number;
    } | null>(null)


    async function request() {
        const response = await axios.get("http://localhost:3001/api/user", { withCredentials: true })
        console.log({ response })
        console.log({ responseStatus: response.status })
    }

    useEffect(() => {
        const user = getUser()
        console.log({ user })
        setUserCurrent(user)
        if (!user) {
            router.push("/auth/signin")
            return
        }
        request()
    }, [])

    const dummyProfileUrl = `https://static.vecteezy.com/system/resources/previews/043/361/860/non_2x/hand-drawnman-avatar-profile-icon-for-social-networks-forums-and-dating-sites-user-avatar-profile-placeholder-anonymous-user-male-no-photo-web-template-default-user-picture-profile-male-symbol-free-vector.jpg`

    return (
        <>
            Authenticated page normal not google auth redirected
            <User email={userCurrent?.email || ""} name={userCurrent?.email || ""} profile={dummyProfileUrl} />
        </>
    )
}
