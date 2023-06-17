import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { usersForTests, genAccounts } from "../../../setup";
import ReadTransactionUseCase from "@/domain/Transaction/useCases/ReadTransactionUseCase";

describe("CreateTransactionUseCase", () => {
	const tranRepo = new TransactionRepository();
	const accRepo = new AccountRepository();
	const userRepo = new UserRepository();

	const user = usersForTests[0];
	const from = genAccounts(user)[0];
	const to = genAccounts(user)[1];

	const createTransaction = new CreateTransactionUseCase(tranRepo);
	const readTransaction = new ReadTransactionUseCase(tranRepo);

	beforeAll(async () => {
		const createUser = new CreateUserUseCase(userRepo);
		const createAccount = new CreateAccountUseCase(accRepo);

		await createUser.execute(user);
		await createAccount.execute(from);
		await createAccount.execute(to);
	});

	it("should create a transaction", async () => {
		const result = await createTransaction.execute({
			dto: {
				amount: 100,
				fromAccountId: from.id,
				toAccountId: to.id,
			},
			user,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBeInstanceOf(Transaction);
		expect(
			(await readTransaction.execute(result.value.id)).value
		).toMatchObject(result.value);
	}, 10000);
});
