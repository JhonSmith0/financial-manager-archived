import Account from "@/domain/Account/entity";
import { SearchTransactionDTO } from "@/domain/Transaction/dto/SearchTransactionDTO";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepositoryInMemory } from "@/domain/Transaction/repo/TransactionRepositoryInMemory";
import { SearchTransactionUseCase } from "@/domain/Transaction/useCases/SearchTransactionUseCase";

describe("SearchTransactionUseCase", () => {
  const repo = new TransactionRepositoryInMemory();
  const useCase = new SearchTransactionUseCase(repo);

  const user = { id: "11111" };
  const acc1 = Account.create({
    description: "",
    name: "123456",
    userId: user.id,
  });
  const acc2 = Account.create({
    description: "",
    name: "45456456",
    userId: user.id,
  });

  beforeAll(async () => {
    for (const _ of Array.from({ length: 400 })) {
      const acc = Transaction.create({
        amount: 100,
        fromAccountId: acc1.id,
        toAccountId: acc2.id,
        userId: user.id,
      });

      await repo.add(acc);
    }
  });

  it("should return transactions", async () => {
    const result = await useCase.execute({
      dto: new SearchTransactionDTO({}),
      user,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value.page).toBe(1);
    expect(result.value.results.length).toBe(300);
  });
  it("should 100 transactions", async () => {
    const result = await useCase.execute({
      dto: new SearchTransactionDTO({ page: 2 }),
      user,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value.page).toBe(2);
    expect(result.value.results.length).toBe(100);
  });
});
