import z from "zod"

export const authGoogleType = z.object({
    token: z.string({ message: "token not provided" })
})
