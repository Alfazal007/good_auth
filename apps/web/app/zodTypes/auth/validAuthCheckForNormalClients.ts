import z from "zod"

export const authCheckApiKey = z.object({
    apiKey: z.string({ message: "api key not provided" }),
    email: z.string({ message: "email not provided" }),
    token: z.string({ message: "token not provided" }),
})
