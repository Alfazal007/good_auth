"use client"

import { GOODAUTHAPIKEY, ORGID } from "@/constants"
import { SignUp } from "@itachi__uchiha/goodauthfe"
import { useRouter } from "next/navigation"

export default function() {
    const router = useRouter()

    return (
        <>
            <SignUp orgName="example" router={router} orgId={ORGID} redirectUrl="http://localhost:3001/authenticated/home" apiKey={GOODAUTHAPIKEY} />
        </>
    )
}
