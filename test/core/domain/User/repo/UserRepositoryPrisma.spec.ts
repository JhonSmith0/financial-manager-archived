import User from "@/core/domain/User/entity/User";
import UserRepositoryPrisma from "@/core/domain/User/repo/UserRepositoryPrisma";

describe("UserRepositoryPrisma", function () {
  let user: User;
  let repo: UserRepositoryPrisma;

  beforeAll(async () => {
    user = await User.create({
      email: "testuser@email.com",
      name: "test user",
      password: "123456",
      photo: "1234",
    });

    repo = new UserRepositoryPrisma();
    await repo.$connect();
    await repo.user.deleteMany();
  });

  it("should create a new user", async function () {
    await repo.add(user);
    expect(repo.findByProp("id", user.id, true)).toBeTruthy();
  });

  it("should update user", async function () {
    const newName = "updated-user-name";
    await repo.update(user.id, { name: newName });

    const result = await repo.findByProp("id", user.id, true);

    result && expect(result.name).toEqual(newName);
  });

  it("should remove user", async function () {
    await repo.remove(user.id);

    const result = await repo.findByProp("id", user.id, true);

    expect(result).toBeFalsy();
  });
});
