import NotFoundError from "@/common/errors/NotFoundError";
import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { ReadAccountUseCase } from "@/domain/Account/useCases/ReadAccountUseCase.1";

describe("ReadAccountUseCase", () => {
  const repo = new AccountRepositoryInMemory();
  const useCase = new ReadAccountUseCase(repo);

  let accounts = Array.from({ length: 20 }, (_, i) => {
    return Account.create({
      description: "",
      name: "a" + i,
      userId: "123",
    });
  });

  beforeAll(async () => {
    for (const each of accounts) {
        await repo.add(each)
    }
  })

  it("should give not found error", async function () {
    const result = await useCase.execute({ accountId: "" });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotFoundError);
  });

  it("should find", async () => {
    const result = await useCase.execute({ accountId: accounts[0].id });
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Account);
  });
});
