"use client"

import { SignInWrapper } from "@/components/Signinwrapper"
import { ORGID } from "@/constants"
import { useRouter } from "next/navigation"

export default function() {
    const router = useRouter()

    return (
        <>
            <SignInWrapper orgName="example" redirectUrl="http://localhost:3001/authenticated/home" router={router} orgId={ORGID} />
        </>
    )
}
