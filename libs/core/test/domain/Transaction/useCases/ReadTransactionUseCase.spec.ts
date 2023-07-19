import NotFoundError from "@/common/errors/NotFoundError"
import { AccountRepository } from "@/domain/Account/repo/AccountRepository"
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase"
import { TransactionWithAccounts } from "@/domain/Transaction/entity/TransactionWithAccounts"
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository"

import { TransactionWithAccountsProps } from "@/domain/Transaction/types/TransactionWithAccountsProps"
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase"
import ReadTransactionUseCase from "@/domain/Transaction/useCases/ReadTransactionUseCase"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"
import { fakeAccount, fakeTransaction, fakeUser } from "../../../setup/faker"

describe("ReadTransactionUseCase", () => {
    const tranRepo = new TransactionRepository()
    const accRepo = new AccountRepository()
    const userRepo = new UserRepository()

    const user = fakeUser()
    const from = fakeAccount(user)
    const to = fakeAccount(user)

    const transaction1 = fakeTransaction(user, from, to)

    const createTransaction = new CreateTransactionUseCase(tranRepo)
    const readTransaction = new ReadTransactionUseCase(tranRepo)

    beforeAll(async () => {
        const createUser = new CreateUserUseCase(userRepo)
        const createAccount = new CreateAccountUseCase(accRepo)

        await createUser.execute(user)
        await createAccount.execute(from)
        await createAccount.execute(to)

        await createTransaction.execute({ dto: transaction1, user })
    })

    it("should give not found error", async () => {
        const result = await readTransaction.execute("invalid id")

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotFoundError)
    })
    it("should give right with the transaction", async () => {
        const result = await readTransaction.execute(transaction1.id)

        expect(result.isRight()).toBeTruthy()

        const value = result.value as TransactionWithAccountsProps

        expect(value).toBeInstanceOf(TransactionWithAccounts)
    })
})
