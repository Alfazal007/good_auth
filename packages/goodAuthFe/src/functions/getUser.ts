export function getUser() {
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

