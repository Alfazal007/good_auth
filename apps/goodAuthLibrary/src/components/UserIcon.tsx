export function User(props: { profile: string, name: string, email: string }) {
    const { profile, name, email } = props
    return (
        <>
            <image href={profile} />
            <div>{name}</div>
            <div>{email}</div>
        </>
    )
}
