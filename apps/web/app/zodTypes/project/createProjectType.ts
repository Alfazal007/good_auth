import z from "zod"

export const createProjectType = z.object({
    name: z.string({ message: "project name not provided" })
        .min(1, { message: "minimum length of project name should be 1" }),
})
