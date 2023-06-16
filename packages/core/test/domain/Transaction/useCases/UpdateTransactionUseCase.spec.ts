import NotFoundError from "@/common/errors/NotFoundError";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepositoryInMemory } from "@/domain/Transaction/repo/TransactionRepositoryInMemory";
import { UpdateTransactionUseCase } from "@/domain/Transaction/useCases/UpdateTransactionUseCase";

describe("UpdateTransactionUseCase", () => {
  const repo = new TransactionRepositoryInMemory();
  const useCase = new UpdateTransactionUseCase(repo);

  const transactions = Array.from({ length: 10 }, (_, i) =>
    Transaction.create({
      amount: 100,
      fromAccountId: "1",
      toAccountId: "2",
      userId: "123",
    })
  );

  beforeAll(async () => {
    for (const each of transactions) {
        await repo.add(each)
    }
  })

  it("should say account dont exists", async () => {
    const result = await useCase.execute({
      dto: {} as any,
      transaction: { id: transactions[0].id + "a" },
    });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotFoundError);
  });

  it("should update just fine", async () => {
    const result = await useCase.execute({
      dto: {
        amount: 200,
      } as any,
      transaction: { id: transactions[0].id },
    });
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Transaction);
  });
});
