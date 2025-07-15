import z from "zod"

export const otpType = z.object({
    otp: z.string({ message: "otp not provided" })
        .length(6, { message: "minimum length of otp should be 6" }),
    email: z.email({ message: "email not provided" }),
})
