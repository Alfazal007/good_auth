"use client"

export function User(props: { profile: string, name: string, email: string }) {
    const { profile, name, email } = props
    return (
        <>
            <img
                src={profile}
                alt="Profile picture"
                width={200}
                height={200}
                className="rounded-full"
            />
            <div>{name}</div>
            <div>{email}</div>
        </>
    )
}
