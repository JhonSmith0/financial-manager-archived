import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";
import { ReadAccountTransactionsUseCase } from "@/domain/Transaction/useCases/ReadAccountTransactions";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { fakeAccount, fakeTransaction, fakeUser } from "../../../setup/faker";
import { TransactionWithAccounts } from "@/domain/Transaction/entity/TransactionWithAccounts";

describe("ReadAccountTransactions", () => {
	const tranRepo = new TransactionRepository();

	const user = fakeUser();
	const from = fakeAccount(user);
	const to = fakeAccount(user);

	const transactions = Array.from({ length: 10 }, () =>
		fakeTransaction(user, from, to)
	);

	beforeAll(async () => {
		const createUser = new CreateUserUseCase(new UserRepository());
		const createAcc = new CreateAccountUseCase(new AccountRepository());
		const createTran = new CreateTransactionUseCase(
			new TransactionRepository()
		);

		await createUser.execute(user);
		await createAcc.execute(from);
		await createAcc.execute(to);

		for (const each of transactions) {
			await createTran.execute({ dto: each, user });
		}
	});

	const readTransactions = new ReadAccountTransactionsUseCase(tranRepo);

	it("shuold return 0 transactions", async () => {
		const results = await readTransactions.execute({ accountId: "1" });
		expect(results.isRight()).toBeTruthy();
		expect(results.value.length).toBe(0);
	});
	it("shuold return 10 transactions", async () => {
		const results = await readTransactions.execute({ accountId: from.id });
		expect(results.isRight()).toBeTruthy();
		expect(results.value.length).toBe(transactions.length);
		expect(results.value[0]).toBeInstanceOf(TransactionWithAccounts);
	});
});
