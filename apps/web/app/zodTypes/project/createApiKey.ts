import z from "zod"

export const createApiKeyType = z.object({
    projectId: z.string({ message: "project id not provided" })
        .min(1, { message: "minimum length of project id should be 1" }),
})
