import { AccountRepository } from "@/domain/Account/repo/AccountRepository"
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase"
import { Transaction } from "@/domain/Transaction/entity"
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository"
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"
import ReadTransactionUseCase from "@/domain/Transaction/useCases/ReadTransactionUseCase"
import { fakeAccount, fakeTransaction, fakeUser } from "../../../setup/faker"

describe("CreateTransactionUseCase", () => {
    const tranRepo = new TransactionRepository()
    const accRepo = new AccountRepository()
    const userRepo = new UserRepository()

    const user = fakeUser()
    const from = fakeAccount(user)
    const to = fakeAccount(user)

    const createTransaction = new CreateTransactionUseCase(tranRepo)
    const readTransaction = new ReadTransactionUseCase(tranRepo)

    beforeAll(async () => {
        const createUser = new CreateUserUseCase(userRepo)
        const createAccount = new CreateAccountUseCase(accRepo)

        await createUser.execute(user)
        await createAccount.execute(from)
        await createAccount.execute(to)
    })

    it("should create a transaction", async () => {
        const result = await createTransaction.execute({
            dto: fakeTransaction(user, from, to),
            user,
        })

        expect(result.isRight()).toBeTruthy()
        expect(result.value).toBeInstanceOf(Transaction)
        expect(
            (await readTransaction.execute(result.value.id)).value
        ).toMatchObject(result.value)
    }, 10000)
})
