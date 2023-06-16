import { SearchAccountDTO } from "@/domain/Account/dto/SearchAccountDTO";
import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { SearchAccountUseCase } from "@/domain/Account/useCases/SearchAccountUseCase";
import { randomUUID } from "crypto";

describe("SearchAccountUseCase", () => {
  const repo = new AccountRepositoryInMemory();
  const useCase = new SearchAccountUseCase(repo);

  const user = { id: "123" };
  let accounts: Account[] = Array.from({ length: 100 }, (_, i) =>
    Account.create({
      description: "",
      userId: user.id,
      name: `acc [${i}] ${randomUUID().slice(0, 5)}`,
    })
  );

  beforeAll(async () => {
    for (const each of accounts) {
      await repo.add(each);
    }
  });

  it("should return 60 accounts", async () => {
    const results = await useCase.execute({
      dto: SearchAccountDTO.create({
        name: "acc",
      }),
      user,
    });

    expect(results.value.results.length === 60).toBeTruthy();
    expect(results.value.page === 1).toBeTruthy();
  });
  it("should return 1 account", async () => {
    const results = await useCase.execute({
      dto: SearchAccountDTO.create({
        name: accounts[0].name,
      }),
      user,
    });

    expect(results.value.results.length === 1).toBeTruthy();
    expect(results.value.page === 1).toBeTruthy();
  });


  it("should return 40 accounts", async () => {
    const results = await useCase.execute({
      dto: SearchAccountDTO.create({
        name: 'acc',
         page: 2, 
      }),
      user,
    });

    expect(results.value.results.length === 40).toBeTruthy();
    expect(results.value.page === 2).toBeTruthy();
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
