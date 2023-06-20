import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase"
import { fakeAccount, fakeTransaction, fakeUser } from "../../../setup/faker"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"
import { AccountRepository } from "@/domain/Account/repo/AccountRepository"
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase"
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository"
import { TransactionOwnerUseCase } from "@/domain/Transaction/useCases/TransactionOwner"
import NotFoundError from "@/common/errors/NotFoundError"
import User from "@/domain/User/entity/User"

describe("TransactionOwner", () => {
    const user = fakeUser()
    const from = fakeAccount(user)
    const to = fakeAccount(user)
    const transaction = fakeTransaction(user, from, to)

    const transactionOwner = new TransactionOwnerUseCase(
        new TransactionRepository()
    )

    beforeAll(async () => {
        await new CreateUserUseCase(new UserRepository()).execute(user)
        await new CreateAccountUseCase(new AccountRepository()).execute(from)
        await new CreateAccountUseCase(new AccountRepository()).execute(to)
        await new CreateTransactionUseCase(new TransactionRepository()).execute(
            {
                dto: transaction,
                user,
            }
        )
    })

    it("should give not found error", async () => {
        const result = await transactionOwner.execute("invali id")

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotFoundError)
    })
    it("should give the user", async () => {
        const result = await transactionOwner.execute(transaction.id)

        expect(result.isRight()).toBeTruthy()
        expect(result.value).toBeInstanceOf(User)
        expect((result.value as User).id).toBe(user.id)
    })
})
