import NotFoundError from "@/common/errors/NotFoundError";
import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepositoryInMemory } from "@/domain/Transaction/repo/TransactionRepositoryInMemory";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";

describe("CreateTransactionUseCase", () => {
  const repo = new TransactionRepositoryInMemory();
  const accountsRepo = new AccountRepositoryInMemory();

  const user = { id: "1234" };

  const acc1 = Account.create({
    description: "",
    name: "Acc1",
    userId: user.id,
  });
  const acc2 = Account.create({
    description: "",
    name: "Acc2",
    userId: user.id,
  });

  beforeAll(async () => {
    await accountsRepo.add(acc1);
    await accountsRepo.add(acc2);
  });

  const useCase = new CreateTransactionUseCase(repo, accountsRepo);

  it("should create a transaction", async () => {
    const result = await useCase.execute({
      dto: {
        amount: 100,
        fromAccountId: acc1.id,
        toAccountId: acc2.id,
      },
      user,
    });

    const acc = result.value as any as Account;

    expect(result.isRight()).toBeTruthy();
    expect(acc).toBeInstanceOf(Transaction);
    expect(await repo.findByQuery({ id: { equals: acc.id } })).toBeInstanceOf(
      Transaction
    );
  }, 10000);
  it("should fails because user doesnot own accounts", async () => {
    const result = await useCase.execute({
      dto: {
        amount: 100,
        fromAccountId: acc1.id,
        toAccountId: acc2.id,
      },
      user: { id: "otherId" },
    });

    const error = result.value;

    expect(error).toBeInstanceOf(NotFoundError);
  });
});
