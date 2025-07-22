"use client"

import { ORGID } from "@/constants"
import { SignUp } from "@itachi__uchiha/goodauthfe"
import { useRouter } from "next/navigation"

export default function() {
    const router = useRouter()

    return (
        <>
            <SignUp orgName="example" router={router} orgId={ORGID} />
        </>
    )
}
