import { UpdateTransactionDTO } from "@/domain/Transaction/dto/UpdateTransactionDTO"

describe("UpdateTransactionDTO", () => {
    it("should pass", async () => {
        expect(await new UpdateTransactionDTO({}).validate()).toHaveLength(0)
        expect(
            await new UpdateTransactionDTO({
                amount: 100,
                date: new Date().toISOString() as any,
                description: "123",
                fromAccountId: "123",
                toAccountId: "1234",
            }).validate()
        ).toHaveLength(0)
    })
    it("should not pass", async () => {
        expect(
            await new UpdateTransactionDTO({
                amount: 100,
                date: new Date().toISOString() as any,
                description: "123",
                fromAccountId: "123",
                toAccountId: "123",
            }).validate()
        ).toHaveLength(1)
    })
    it("should remove extra props", async () => {
        const obj = new UpdateTransactionDTO({
            amount: 100,
            date: new Date().toISOString() as any,
            description: "123",
            fromAccountId: "123",
            toAccountId: "123",
            //@ts-ignore
            extra: {} as any,
        })

        expect(obj).not.toHaveProperty("extra")
    })
})
