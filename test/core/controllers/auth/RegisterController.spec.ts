import JWT from "@/core/common/JWT/JWT";
import AlreadyExistsError from "@/core/common/errors/AlreadyExistsError";
import RegisterController from "@/core/controllers/auth/RegisterController";
import CreateUserDTO from "@/core/domain/User/dto/CreateUserDTO";
import User from "@/core/domain/User/entity/User";
import UserRepositoryInMemory from "@/core/domain/User/repo/UserRepositoryInMemory";
import CreateUserUseCase from "@/core/domain/User/useCases/CreateUserUseCase";

describe("RegisterController", () => {
  const jwt = new JWT("1");
  const repo = new UserRepositoryInMemory();
  const useCase = new CreateUserUseCase(repo);
  const controller = new RegisterController(useCase, jwt);

  it("should return a token", async () => {
    const { right: result } = (await controller.execute(
      CreateUserDTO.create(User.dataForTest)
    )) as any;

    expect(typeof result === "string").toBeTruthy();
  });
  it("should give already exists error", async () => {
    const { left: result } = (await controller.execute(
      CreateUserDTO.create(User.dataForTest)
    )) as any;

    expect(result).toBeInstanceOf(AlreadyExistsError);
  });
  it("should give validation error", async () => {
    const { left: result } = (await controller.execute(
      CreateUserDTO.create({ ...User.dataForTest, password: "12344" })
    )) as any;

    expect(result).toBeInstanceOf(Array);
  });
});
