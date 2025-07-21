import { SignIn } from "@itachi__uchiha/goodauth/client";

export default function() {
    return (
        <>
            <SignIn orgName="example" redirectUrl="http://locahost:3001/authenticated/home" />
        </>
    )
}
