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
    const { right: result } = (await controller.handle(
      LoginUserDTO.create(data)
    )) as any;

    expect(typeof result === "string").toBeTruthy();
  });
  it("should give invalid data", async () => {
    const result = (await controller.handle(
      LoginUserDTO.create({ ...data, password: "18767867864" })
    )) as any;

    expect(result.left).toBeInstanceOf(GenericError);
  });
});
