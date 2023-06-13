import JWT from "@/common/JWT/JWT";
import GenericError from "@/common/errors/GenericError";
import ValidationError from "@/common/errors/ValidationError";
import LoginController from "@/controllers/auth/LoginController";
import LoginUserDTO from "@/domain/User/dto/LoginUserDTO";
import User from "@/domain/User/entity/User";
import UserRepositoryInMemory from "@/domain/User/repo/UserRepositoryInMemory";

describe("LoginController", () => {
  const repo = new UserRepositoryInMemory();
  const data = User.dataForTest;
  let user: User;
  const controller = new LoginController(repo, new JWT("1"));

  beforeAll(async () => {
    user = await User.create(data);
    await repo.add(user);
  });

  it("should return a jwt", async () => {
    const result = (await controller.handle(
      LoginUserDTO.create(data)
    )) 

    expect(result.isRight()).toBeTruthy();
    expect(typeof result.value).toBe('string');
  });
  it("should give invalid data", async () => {
    const result = (await controller.handle(
      LoginUserDTO.create({ ...data, password: "18767867864" })
    )) 

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(GenericError);
  });
});
