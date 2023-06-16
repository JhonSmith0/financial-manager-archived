import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";

describe("CreateAccountUseCase", () => {
  const repo = new AccountRepositoryInMemory();
  const useCase = new CreateAccountUseCase(repo);

  const user = { id: "123" };
  const acc1 = Account.create({
    description: "",
    name: "123456",
    userId: user.id,
  });

  const acc2 = Account.create({
    description: "",
    name: "1456",
    userId: user.id + '3',
  });

  it("should create an account", async () => {
    const result = await useCase.exec(acc1);
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Account);
  });
  
  it("should give already exists", async () => {
    const result = await useCase.exec(acc1);
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(AlreadyExistsError);
  });

  it("should create acc2", async () => {
    const result = await useCase.exec(acc2);
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Account);
  });

  
});
