import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { SearchTransactionDTO } from "@/domain/Transaction/dto/SearchTransactionDTO";
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";
import { SearchTransactionUseCase } from "@/domain/Transaction/useCases/SearchTransactionUseCase";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { genAccounts, genTransactions, usersForTests } from "../../../setup";

describe("SearchTransactionUseCase", () => {
	const tranRepo = new TransactionRepository();
	const accRepo = new AccountRepository();
	const userRepo = new UserRepository();

	const user = usersForTests[0];
	const from = genAccounts(user)[0];
	const to = genAccounts(user)[1];

	const createTransaction = new CreateTransactionUseCase(tranRepo);
	const searchTransactions = new SearchTransactionUseCase(tranRepo);

	beforeAll(async () => {
		const createUser = new CreateUserUseCase(userRepo);
		const createAccount = new CreateAccountUseCase(accRepo);

		await createUser.execute(user);
		await createAccount.execute(from);
		await createAccount.execute(to);

		for (const transaction of genTransactions(from, to, user, 100)) {
			await createTransaction.execute({ dto: transaction, user });
		}
	});

	it("should return all the transactions", async () => {
		const result = await searchTransactions.execute({
			dto: new SearchTransactionDTO({}),
			user,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value.page).toBe(1);
		expect(result.value.results.length).toBe(100);
	});
});
