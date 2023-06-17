import NotFoundError from "@/common/errors/NotFoundError";
import Account from "@/domain/Account/entity";
import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { ReadAccountUseCase } from "@/domain/Account/useCases/ReadAccountUseCase.1";
import { accountsForTests, usersForTests } from "../../../setup";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import UserRepository from "@/domain/User/repo/UserRepository";

describe("ReadAccountUseCase", () => {
  const repo = new AccountRepository();
  const createUserUseCase = new CreateUserUseCase(new UserRepository());
  const createAccountUseCase = new CreateAccountUseCase(repo);
  const readAccountUseCase = new ReadAccountUseCase(repo);

  const accounts = accountsForTests

  beforeAll(async () => {
    await createUserUseCase.execute(usersForTests[0])
    await createAccountUseCase.execute(accountsForTests[0])

  })

  it("should give not found error", async function () {
    const result = await readAccountUseCase.execute({ accountId: "" });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotFoundError);
  });

  it("should find", async () => {
    const result = await readAccountUseCase.execute({ accountId: accounts[0].id });
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Account);
  });
});
