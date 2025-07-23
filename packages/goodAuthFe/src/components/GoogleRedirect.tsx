export function GoogleRedirect({ redirectUrl, orgId, apiKey }: { redirectUrl: string, apiKey: string, orgId: string }) {
    const handleLogin = () => {
        const redirect = encodeURIComponent(redirectUrl)
        window.location.href = `http://localhost:8000/oauth/google/start?redirect=${redirect}&orgId=${orgId}&apiKey=${apiKey}`
    }

    return (
        <button onClick={handleLogin}>SIGN IN WITH GOOGLE</button>
    )
}
