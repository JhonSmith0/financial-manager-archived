import * as y from "yup"

const newTransactionSchema = y.object({
    date: y.date().required(),
    description: y.string().optional().default(""),
    amount: y.number().min(0).required(),
    fromAccountId: y
        .string()
        .required()
        .test({
            test(value, ctx) {
                return !(value === ctx.parent.toAccountId)
            },
        }),
    toAccountId: y.string().required(),
})

export default newTransactionSchema
