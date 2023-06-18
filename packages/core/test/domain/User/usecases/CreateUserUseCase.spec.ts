import GenericError from "@/common/errors/GenericError"
import CreateUserDTO from "@/domain/User/dto/CreateUserDTO"
import User from "@/domain/User/entity/User"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"

describe("CreateUserUseCase", () => {
    const repo = new UserRepository()
    const createUser = new CreateUserUseCase(repo)

    const data = CreateUserDTO.create({
        email: "testuser@email.com",
        name: "test user",
        password: "123456",
        photo: "1234",
    })

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
