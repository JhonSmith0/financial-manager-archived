import NotFoundError from "@/common/errors/NotFoundError"
import { AccountRepository } from "@/domain/Account/repo/AccountRepository"
import { AccountOwnerUseCase } from "@/domain/Account/useCases/AccountOwnerUseCase"
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase"
import User from "@/domain/User/entity/User"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"
import { fakeAccount, fakeUser } from "../../../setup/faker"

describe("AccountOwnerUseCase", () => {
    const user = fakeUser()
    const account = fakeAccount(user)

    const readAccountOwner = new AccountOwnerUseCase(new AccountRepository())

    beforeAll(async () => {
        const createUser = new CreateUserUseCase(new UserRepository())
        const createAccount = new CreateAccountUseCase(new AccountRepository())

        await createUser.execute(user)
        await createAccount.execute(account)
    })

    it("should give not found error", async () => {
        const result = await readAccountOwner.execute("invalid id")

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotFoundError)
    })
    it("should return user", async () => {
        const result = await readAccountOwner.execute(account.id)

        expect(result.isRight()).toBeTruthy()
        expect(result.value).toBeInstanceOf(User)
        expect((result.value as User).id).toBe(user.id)
    })
})
