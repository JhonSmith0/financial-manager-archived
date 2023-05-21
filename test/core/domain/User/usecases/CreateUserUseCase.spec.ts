import AlreadyExistsError from "@/core/common/errors/AlreadyExistsError";
import CreateUserDTO from "@/core/domain/User/dto/CreateUserDTO";
import User from "@/core/domain/User/entity/User";
import UserRepositoryInMemory from "@/core/domain/User/repo/UserRepositoryInMemory";
import CreateUserUseCase from "@/core/domain/User/useCases/CreateUserUseCase";

describe("CreateUserUseCase", () => {
  const repo = new UserRepositoryInMemory();
  const createUser = new CreateUserUseCase(repo);

  const data = CreateUserDTO.create({
    email: "testuser@email.com",
    name: "test user",
    password: "123456",
    photo: "1234",
  });

  it("should return an user", async () => {
    const { right: value } = (await createUser.execute(data)) as any;
    expect(value).toBeInstanceOf(User);
  });
  it("should return an already exists error", async () => {
    const { left: value } = (await createUser.execute(data)) as any;
    expect(value).toBeInstanceOf(AlreadyExistsError);
  });
});
