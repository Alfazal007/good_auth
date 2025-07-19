import z from "zod"

export const userAuthType = z.object({
    email: z.email({ message: "email not provided" }),
    password: z.string({ message: "password not provided" })
        .min(6, { message: "minimum length of password should be 6" })
        .max(20, { message: "maximum length of password should be 20" }),
})
