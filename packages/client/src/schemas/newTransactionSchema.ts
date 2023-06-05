import * as y from "yup";

const newTransactionSchema = y.object({
  date: y.string(),
  description: y.string().optional().default(""),
  amount: y.number().min(0).required(),
  fromAccountId: y
    .string()
    .required()
    .test({
      test(value, ctx) {
        console.log(value, ctx.resolve("toAccountId"));
        return value === ctx.resolve("toAccountId");
      },
    }),
  toAccountId: y.string().required(),
});

export default newTransactionSchema;
