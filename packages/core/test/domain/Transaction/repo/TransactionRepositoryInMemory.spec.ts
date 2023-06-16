import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionWithAccountsProps } from "@/domain/Transaction/types/TransactionWithAccountsProps";
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository";

import { randomUUID } from "crypto";

describe("TransactionRepositoryInMemory", () => {
	const accountRepo = new AccountRepositoryInMemory();
	const transactionRepo = new TransactionRepositoryInMemory(accountRepo);
	const tr = Transaction.create({
		amount: 100,
		description: "",
		fromAccountId: "1",
		toAccountId: "2",
		userId: "123",
	});

	const user = { id: randomUUID() };

	const accounts = Array.from({ length: 100 }, (_, i) =>
		Account.create({
			description: "",
			name: "987398" + i,
			userId: user.id,
		})
	);

	const transactions = Array.from({ length: 100 }, (_, i) =>
		Transaction.create({
			amount: 100 * i,
			fromAccountId: accounts[0].id,
			toAccountId: accounts[1].id,
			userId: user.id,
		})
	);

	beforeAll(() => {
		accountRepo.data = accounts;
		transactionRepo.data = transactions;
	});

	afterEach(() => {
		accountRepo.data = accounts;
		transactionRepo.data = transactions;
	});

	//query
	//add
	it("should add a Transaction and make use of query system", async () => {
		await transactionRepo.add(tr);
		expect(
			await transactionRepo.findByQuery({ id: { equals: tr.id } })
		).toMatchObject(tr);
	});

	it("should update transaction", async () => {
		tr.amount = 200;
		await transactionRepo.update(tr.id, tr);
		expect(
			await transactionRepo.findByQuery({ id: { equals: tr.id } })
		).toMatchObject(tr);
	});
	it("should update remove transaction", async () => {
		await transactionRepo.remove(tr.id);
		expect(
			await transactionRepo.findByQuery({ id: { equals: tr.id } })
		).toBeFalsy();
	});

	it("should delete the transactions", async () => {
		const accs = Array.from({ length: 100 }, (_, i) =>
			Transaction.create({
				description: "",
				amount: 100,
				fromAccountId: "1",
				toAccountId: "2",
				userId: "specificid",
			})
		);

		await Promise.all(accs.map((e) => transactionRepo.add(e)));

		await transactionRepo.deleteByQuery({
			userId: {
				equals: accs[0].userId,
			},
		});

		expect(
			await transactionRepo.findByQuery({
				userId: {
					equals: accs[0].id,
				},
			})
		).toBeFalsy();
	});

	it("should read the transaction with its accounts", async () => {
		const acc1 = Account.create({
			description: "",
			name: "account1",
			userId: "1456",
		});
		const acc2 = Account.create({
			description: "",
			name: "account2",
			userId: "1456",
		});

		const transaction = Transaction.create({
			amount: 100,
			fromAccountId: acc1.id,
			toAccountId: acc2.id,
			userId: "1456",
		});

		await accountRepo.add(acc1);
		await accountRepo.add(acc2);

		await transactionRepo.add(transaction);

		const result = await transactionRepo.readTransactionWithAccounts(
			transaction.id
		);

		const expectedObj = {
			...transaction,
			fromAccount: acc1,
			toAccount: acc2,
		};

		expect(result).toMatchObject(expectedObj);
	});

	it("shuold search transactions", async () => {
		const results = await transactionRepo.search({});

		expect(results[0].toAccount).toHaveProperty("id");
		expect(results[0].fromAccount).toHaveProperty("id");
		expect(results).toHaveLength(100);
	});
});
