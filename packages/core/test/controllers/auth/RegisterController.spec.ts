import JWT from "@/common/JWT/JWT";
import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import GenericError from "@/common/errors/GenericError";
import ValidationError from "@/common/errors/ValidationError";
import RegisterController from "@/controllers/auth/RegisterController";
import CreateUserDTO from "@/domain/User/dto/CreateUserDTO";
import User from "@/domain/User/entity/User";
import UserRepositoryInMemory from "@/domain/User/repo/UserRepositoryInMemory";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";

describe("RegisterController", () => {
  const jwt = new JWT("1");
  const repo = new UserRepositoryInMemory();
  const useCase = new CreateUserUseCase(repo);
  const controller = new RegisterController(useCase, jwt);

  it("should return a token", async () => {
    const { right: result } = (await controller.handle(
      CreateUserDTO.create(User.dataForTest)
    )) as any;

    expect(typeof result === "string").toBeTruthy();
  });
  it("should give already exists error", async () => {
    const { left: result } = (await controller.handle(
      CreateUserDTO.create(User.dataForTest)
    )) as any;

    expect(result).toBeInstanceOf(GenericError);
  });
  it("should give validation error", async () => {
    const { left: result } = (await controller.handle(
      CreateUserDTO.create({ ...User.dataForTest, password: "12344" })
    )) as any;

    expect(result).toBeInstanceOf(ValidationError);
  });
});
