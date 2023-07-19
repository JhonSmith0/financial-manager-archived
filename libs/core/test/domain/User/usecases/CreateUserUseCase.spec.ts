import GenericError from "@/common/errors/GenericError"
import CreateUserDTO from "@/domain/User/dto/CreateUserDTO"
import User from "@/domain/User/entity/User"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"
import { fakeUser } from "../../../setup/faker"

describe("CreateUserUseCase", () => {
    const repo = new UserRepository()
    const createUser = new CreateUserUseCase(repo)

    const data = fakeUser()
    it("should return an user", async () => {
        const result = await createUser.execute(data)
        expect(result.isRight()).toBeTruthy()
        expect(result.value).toBeInstanceOf(User)
    })
    it("should return an already exists error", async () => {
        const result = await createUser.execute(data)
        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(GenericError)
    })
})
