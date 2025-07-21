"use client"

import { SignInWrapper } from "@/components/Signinwrapper"
import { useRouter } from "next/navigation"

export default function() {
    const router = useRouter()

    return (
        <>
            <SignInWrapper orgName="example" redirectUrl="http://localhost:3001/authenticated/home" router={router} />
        </>
    )
}
