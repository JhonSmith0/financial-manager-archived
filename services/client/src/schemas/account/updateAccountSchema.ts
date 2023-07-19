import * as y from "yup"

export const updateAccountSchema = y.object({
    description: y.string().max(128),
    name: y.string().max(24).min(4),
})
