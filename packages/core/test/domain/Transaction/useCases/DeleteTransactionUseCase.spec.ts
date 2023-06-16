import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepositoryInMemory } from "@/domain/Transaction/repo/TransactionRepositoryInMemory";
import { DeleteTransactionUseCase } from "@/domain/Transaction/useCases/DeleteTransactionUseCase";

describe("DeleteTransactionUseCase", () => {
  const repo = new TransactionRepositoryInMemory();
  const useCase = new DeleteTransactionUseCase(repo);

  const transactions = Array.from({ length: 100 }, (_, i) => {
    return Transaction.create({
      description: "123",
      amount: 100 * i,
      fromAccountId: "1",
      toAccountId: "2",
      userId: "123",
    });
  });
  beforeAll(async () => {
    for (const each of transactions) {
      await repo.add(each);
    }
  });

  it("should delete all transactions", async () => {
    for (const each of transactions) {
      await useCase.execute({ dto: { id: each.id } });
      expect(await repo.findByQuery({ id: { equals: each.id } })).toBeFalsy();
    }
  });
});
