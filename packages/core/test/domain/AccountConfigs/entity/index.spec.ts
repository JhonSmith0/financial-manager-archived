import { AccountConfigs } from "@/domain/AccountConfigs/entity"

describe("AccountConfigs", () => {
    const data = {
        userId: "user id",
    }

    it("shuold replace with boolean true", () => {
        const obj = new AccountConfigs(data as any)

        expect(obj.allowTransactionsWhenAccountIsBelowZero).toBe(true)
        expect(obj.userId).toBe(data.userId)
    })
})
