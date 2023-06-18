import { PrismaRepo } from "@/common/repo/PrismaRepo"
import Account from "@/domain/Account/entity"
import { AccountRepository } from "@/domain/Account/repo/AccountRepository"
import { AccountBalanceUseCase } from "@/domain/Account/useCases/AccountBalanceUseCase"
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository"
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase"
import User from "@/domain/User/entity/User"
import { fakeTransaction } from "../../../setup/faker"
import { createRandomAccount, createRandomTransaction } from "../../../utils"

describe("test", () => {
    let from: Account
    let to: Account
    let user: User

    const getBalance = new AccountBalanceUseCase(new AccountRepository())

    beforeAll(async () => {
        const repo = new PrismaRepo()

        ;({
            accounts: [from, to],
            user,
        } = await createRandomAccount(repo, 2))

        const createTransaction = new CreateTransactionUseCase(
            new TransactionRepository()
        )

        for (const each of Array.from({ length: 10 })) {
            await createTransaction.execute({
                dto: { ...fakeTransaction(user, from, to), amount: 100 },
                user,
            })
        }

        for (const each of Array.from({ length: 10 })) {
            await createTransaction.execute({
                dto: { ...fakeTransaction(user, to, from), amount: 100 },
                user,
            })
        }

        await createRandomTransaction(repo, 10)
    })

    it("it shuold give 0 for both of transactions", async () => {
        const fromBalance = await getBalance.execute(from.id)
        const toBalance = await getBalance.execute(to.id)

        expect(fromBalance.isRight()).toBeTruthy()
        expect(toBalance.isRight()).toBeTruthy()
        expect(toBalance.value).toBe(0)
        expect(toBalance.value).toBe(0)
    })
})
