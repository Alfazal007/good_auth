import React, { createContext, useState } from "react";

export type UserType = {
    accessToken: string,
    email: string,
    id: string,
}

export const UserContext = createContext<{
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}>({
    user: null,
    setUser: () => { }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider >
    );
}
