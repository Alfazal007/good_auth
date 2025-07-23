import Cookies from "js-cookie"

export function getUser() {
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get("accessToken")
    const urlEmail = params.get("email")
    const urlId = params.get("id")
    if (urlId && urlEmail && urlToken) {
        setCookies("email", urlEmail)
        setCookies("accessToken", urlToken)
        setCookies("id", urlId)
    }
    const email = getCookie("email")
    const token = getCookie("accessToken");
    const idString = getCookie("id");
    if (!email || !token || !idString) {
        return null
    }
    const id = parseInt(idString)
    if (!id) {
        return null
    }
    return { email, token, id }
}

function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

export function setCookies(key: string, value: string) {
    Cookies.set(key, value, {
        secure: true,
        path: "/",
        expires: 1,
    })
}
