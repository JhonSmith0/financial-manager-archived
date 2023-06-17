import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository";

import { DeleteTransactionUseCase } from "@/domain/Transaction/useCases/DeleteTransactionUseCase";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";
import ReadTransactionUseCase from "@/domain/Transaction/useCases/ReadTransactionUseCase";
import { Left } from "@/common/ErrorHandlingTypes";
import { fakeAccount, fakeTransaction, fakeUser } from "../../../setup/faker";

describe("DeleteTransactionUseCase", () => {
	const tranRepo = new TransactionRepository();
	const accRepo = new AccountRepository();
	const userRepo = new UserRepository();

	const deleteTransaction = new DeleteTransactionUseCase(tranRepo);
	const readTransaction = new ReadTransactionUseCase(tranRepo);

	let transactions: Transaction[] = [];

	beforeAll(async () => {
		const createUser = new CreateUserUseCase(userRepo);
		const createAccount = new CreateAccountUseCase(accRepo);
		const createTransaction = new CreateTransactionUseCase(tranRepo);

		const user = fakeUser();
		const from = fakeAccount(user);
		const to = fakeAccount(user);

		await createUser.execute(user);
		await createAccount.execute(from);
		await createAccount.execute(to);

		transactions = Array.from({ length: 2 }, () =>
			fakeTransaction(user, from, to)
		);

		for (const transaction of transactions) {
			await createTransaction.execute({ dto: transaction, user });
		}
	});

	it("should delete all transactions", async () => {
		for (const each of transactions) {
			await deleteTransaction.execute({ dto: { id: each.id } });
			expect(await readTransaction.execute(each.id)).toBeInstanceOf(Left);
		}
	});
});
