import z from "zod"

export const otpType = z.object({
    otp: z.string({ message: "otp not provided" })
        .length(4, { message: "minimum length of password should be 4" }),
    email: z.email({ message: "email not provided" }),
})
