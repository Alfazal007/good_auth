"use client"

import axios from "axios"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { toast } from "sonner"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function Google({ router }: { router: AppRouterInstance }) {
    const clientId = "372403264927-l5v70ec5k2ef9k6m5s1nfghu3s761638.apps.googleusercontent.com"
    const handleSuccess = async (credentialResponse: any) => {
        try {
            const res = await axios.post('http://localhost:8000/api/google-login', {
                token: credentialResponse.credential,
                orgApiKey: clientId,
                orgId: process.env.ORGID!,
            })
            console.log('User data:', res.data)
            router.push("/organization/home")
        } catch (err) {
            console.error('Login failed', err)
        }
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => toast('Login Failed')}
                />
            </div>
        </GoogleOAuthProvider>
    )
}
