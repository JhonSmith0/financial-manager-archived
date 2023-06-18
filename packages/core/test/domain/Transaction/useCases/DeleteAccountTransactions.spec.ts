import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";
import { DeleteAccountTransactions } from "@/domain/Transaction/useCases/DeleteAccountTransactions";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { Transaction } from "@prisma/client";
import { fakeUser, fakeAccount, fakeTransaction } from "../../../setup/faker";

describe("DeleteAccountTransactions", () => {
	const tranRepo = new TransactionRepository();
	const accRepo = new AccountRepository();
	const userRepo = new UserRepository();

	const deleteTransactions = new DeleteAccountTransactions(tranRepo);

	let transactions: Transaction[] = [];

	const length = 5;

	const user = fakeUser();
	const from = fakeAccount(user);
	const to = fakeAccount(user);

	beforeAll(async () => {
		const createUser = new CreateUserUseCase(userRepo);
		const createAccount = new CreateAccountUseCase(accRepo);

		await createUser.execute(user);
		await createAccount.execute(from);
		await createAccount.execute(to);
	});

	beforeEach(async () => {
		const createTransaction = new CreateTransactionUseCase(tranRepo);
		transactions = Array.from({ length }, () =>
			fakeTransaction(user, from, to)
		);

		for (const transaction of transactions) {
			await createTransaction.execute({ dto: transaction, user });
		}
	});

	it(`should delete ${length} transactions`, async () => {
		const result = await deleteTransactions.execute(from.id);
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBe(length);
	});
	it(`should delete ${length} transactions`, async () => {
		const result = await deleteTransactions.execute(to.id);
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBe(length);
	});
});
