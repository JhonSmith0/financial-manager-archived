import { SearchAccountDTO } from "@/domain/Account/dto/SearchAccountDTO";
import Account from "@/domain/Account/entity";
import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { SearchAccountUseCase } from "@/domain/Account/useCases/SearchAccountUseCase";
import User from "@/domain/User/entity/User";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { randomUUID } from "crypto";

describe("SearchAccountUseCase", () => {
  const accRepo = new AccountRepository();
  const userRepo = new UserRepository();

  const createUser = new CreateUserUseCase(userRepo)
  const createAccount = new CreateAccountUseCase(accRepo)

  const useCase = new SearchAccountUseCase(accRepo);

  const user = User.create(User.dataForTest)
  let accounts: Account[] = Array.from({ length: 100 }, (_, i) =>
    Account.create({
      description: "",
      userId: user.id,
      name: `acc [${i}] ${randomUUID().slice(0, 5)}`,
    })
  );

  beforeAll(async () => {
    await createUser.execute(user as any);
    for (const account of accounts) {
      await createAccount.execute(account)
    }
  });

  it("should return all accounts", async () => {
    const results = await useCase.execute({
      dto: SearchAccountDTO.create({
        name: "acc",
      }),
      user,
    });

    expect(results.value.results.length === accounts.length).toBeTruthy();
    expect(results.value.page === 1).toBeTruthy();
  });
 


  it("should return 0 accounts", async () => {
    const results = await useCase.execute({
      dto: SearchAccountDTO.create({
        name: '4567898953313',
      }),
      user,
    });

    expect(results.value.results.length === 0).toBeTruthy();
    expect(results.value.page === 1).toBeTruthy();
  });
});
