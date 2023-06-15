import NotFoundError from "@/common/errors/NotFoundError";
import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionWithAccounts } from "@/domain/Transaction/entity/TransactionWithAccounts";
import { TransactionRepositoryInMemory } from "@/domain/Transaction/repo/TransactionRepositoryInMemory";
import { TransactionWithAccountsProps } from "@/domain/Transaction/types/TransactionWithAccountsProps";
import ReadTransactionUseCase from "@/domain/Transaction/useCases/ReadTransactionUseCase";

describe("ReadTransactionUseCase", () => {
    const accountRepo = new AccountRepositoryInMemory();
    const repo = new TransactionRepositoryInMemory(accountRepo);
    const useCase = new ReadTransactionUseCase(repo);

    const acc2 = Account.create({
        description: "",
        name: "12355",
        userId: "1234",
    });
    const acc1 = Account.create({
        description: "",
        name: "123555",
        userId: "1234",
    });

    let transaction = Transaction.create({
        amount: 10,
        fromAccountId: acc1.id,
        toAccountId: acc2.id,
        userId: "123",
    });

    beforeAll(async () => {
        await accountRepo.add(acc1);
        await accountRepo.add(acc2);
        await repo.add(transaction);
    });

    it("should give not found error", async () => {
        const result = await useCase.execute(transaction.id);

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotFoundError);
    });
    it("should give right with the transaction", async () => {
        const result = await useCase.execute(transaction.id);

        expect(result.isRight()).toBeTruthy();

        const value = result.value as TransactionWithAccountsProps;

        expect(value).toBeInstanceOf(TransactionWithAccounts);
    });
});
