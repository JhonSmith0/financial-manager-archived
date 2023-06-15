import NotFoundError from "@/common/errors/NotFoundError";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepositoryInMemory } from "@/domain/Transaction/repo/TransactionRepositoryInMemory";
import ReadTransactionUseCase from "@/domain/Transaction/useCases/ReadTransactionUseCase";

describe("ReadTransactionUseCase", () => {
  const repo = new TransactionRepositoryInMemory();
  const useCase = new ReadTransactionUseCase(repo);

  let acc = Transaction.create({
    amount: 10,
    fromAccountId: "1",
    toAccountId: "2",
    userId: "123",
  });

  beforeAll(async () => {
    await repo.add(acc);
  });

  it("should give not found error", async () => {
    const result = await useCase.execute("1");

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
  it("should give right with the transaction", async () => {
    const result = await useCase.execute(acc.id);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Transaction);
  });
});
