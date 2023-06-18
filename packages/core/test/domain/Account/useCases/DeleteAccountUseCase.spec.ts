import NotFoundError from "@/common/errors/NotFoundError"
import { AccountRepository } from "@/domain/Account/repo/AccountRepository"
import { DeleteAccountUseCase } from "@/domain/Account/useCases/DeleteAccountUseCase"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase"
import { fakeAccount, fakeUser } from "../../../setup/faker"

describe("DeleteAccountUseCase.spec", () => {
    const repo = new AccountRepository()
    const createUserUseCase = new CreateUserUseCase(new UserRepository())
    const deleteAccountUseCase = new DeleteAccountUseCase(repo)
    const createAccountUseCase = new CreateAccountUseCase(repo)

    const user = fakeUser()
    const account = fakeAccount(user)

    beforeAll(async () => {
        await createUserUseCase.execute(user)
        await createAccountUseCase.execute(account)
    })

    it("should give not found error", async () => {
        const result = await deleteAccountUseCase.execute({
            dto: {
                id: "1",
            } as any,
            user,
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotFoundError)
    })
    it("should remove", async () => {
        const result = await deleteAccountUseCase.execute({
            dto: account,
            user,
        })
        expect(result.isRight()).toBeTruthy()
        expect(result.value).toBeFalsy()
    })
})
