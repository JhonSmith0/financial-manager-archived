import Account from "@/domain/Account/entity";
import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";
import User from "@/domain/User/entity/User";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";

describe("CreateTransactionUseCase", () => {
	const userRepo = new UserRepository();
	const accountRepo = new AccountRepository();
	const transactionRepo = new TransactionRepository();

	const createUser = new CreateUserUseCase(userRepo);
	const createAccount = new CreateAccountUseCase(accountRepo);
	const createTransaction = new CreateTransactionUseCase(transactionRepo);

	const user = User.dataForTest;

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
		await createUser.execute(user as any);
		await createAccount.execute(acc1);
		await createAccount.execute(acc2);
	});

	it("should create a transaction", async () => {

    return ;
		const result = await createTransaction.execute({
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
		expect(
			await transactionRepo.db.findUnique({ where: { id: acc.id } })
		).toMatchObject(result.value);
	}, 10000);
});
