import NotFoundError from "@/common/errors/NotFoundError"
import Account from "@/domain/Account/entity"
import { AccountRepository } from "@/domain/Account/repo/AccountRepository"
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase"
import { ReadAccountUseCase } from "@/domain/Account/useCases/ReadAccountUseCase.1"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"
import { fakeAccount, fakeUser } from "../../../setup/faker"

describe("ReadAccountUseCase", () => {
    const repo = new AccountRepository()
    const createUserUseCase = new CreateUserUseCase(new UserRepository())
    const createAccountUseCase = new CreateAccountUseCase(repo)
    const readAccountUseCase = new ReadAccountUseCase(repo)

    const user = fakeUser()
    const account = fakeAccount(user)

    beforeAll(async () => {
        await createUserUseCase.execute(user)
        await createAccountUseCase.execute(account)
    })

    it("should give not found error", async function () {
        const result = await readAccountUseCase.execute({ accountId: "" })
        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotFoundError)
    })

    it("should find", async () => {
        const result = await readAccountUseCase.execute({
            accountId: account.id,
        })
        expect(result.isRight()).toBeTruthy()
        expect(result.value).toBeInstanceOf(Account)
    })
})
