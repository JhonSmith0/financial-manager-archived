import Account from "@/domain/Account/entity";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepositoryInMemory } from "@/domain/Transaction/repo/TransactionRepositoryInMemory";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";

describe("CreateTransactionUseCase", () => {
  const repo = new TransactionRepositoryInMemory();
  const useCase = new CreateTransactionUseCase(repo);

  it("should create a transaction", async () => {
    const result = await useCase.execute({
      dto: {
        amount: 100,
        fromAccountId: "1",
        toAccountId: "2",
      },
    });

    //@ts-ignore
    const acc = result.right as Account;

    expect(acc).toBeInstanceOf(Transaction);
    expect(await repo.findByQuery({ id: { equals: acc.id } })).toBeInstanceOf(
      Transaction
    );
  });
});
