import JWT from "@/common/JWT/JWT"
import GenericError from "@/common/errors/GenericError"
import ValidationError from "@/common/errors/ValidationError"
import RegisterController from "@/controllers/auth/RegisterController"
import CreateUserDTO from "@/domain/User/dto/CreateUserDTO"
import User from "@/domain/User/entity/User"
import UserRepository from "@/domain/User/repo/UserRepository"
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase"
import { fakeUser } from "../../setup/faker"

describe("RegisterController", () => {
    const jwt = new JWT("1")
    const repo = new UserRepository()
    const useCase = new CreateUserUseCase(repo)
    const controller = new RegisterController(useCase, jwt)

    it("should return a token", async () => {
        const result = await controller.handle(CreateUserDTO.create(fakeUser()))

        expect(result.isRight()).toBeTruthy()
        expect(typeof result.value).toBe("string")
    })
    it("should give already exists error", async () => {
        const result = await controller.handle(
            CreateUserDTO.create(User.dataForTest)
        )

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(GenericError)
    })
    it("should give validation error", async () => {
        const result = await controller.handle(
            CreateUserDTO.create({ ...User.dataForTest, password: "12344" })
        )

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(ValidationError)
    })
})
