import NotFoundError from "@/common/errors/NotFoundError";
import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepository } from "@/domain/Transaction/repo/TransactionRepository";
import { CreateTransactionUseCase } from "@/domain/Transaction/useCases/CreateTransactionUseCase";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { UpdateTransactionUseCase } from "@/domain/Transaction/useCases/UpdateTransactionUseCase";
import { fakeUser, fakeAccount, fakeTransaction } from "../../../setup/faker";

describe("UpdateTransactionUseCase", () => {
	const tranRepo = new TransactionRepository();
	const accRepo = new AccountRepository();
	const userRepo = new UserRepository();

	const user = fakeUser();
	const from = fakeAccount(user);
	const to = fakeAccount(user);

	const transaction = fakeTransaction(user, from, to);

	const createTransaction = new CreateTransactionUseCase(tranRepo);
	const updateTransaction = new UpdateTransactionUseCase(tranRepo);

	beforeAll(async () => {
		const createUser = new CreateUserUseCase(userRepo);
		const createAccount = new CreateAccountUseCase(accRepo);

		await createUser.execute(user);
		await createAccount.execute(from);
		await createAccount.execute(to);

		await createTransaction.execute({ dto: transaction, user });
	});
	it("should say account dont exists", async () => {
		const result = await updateTransaction.execute({
			dto: {} as any,
			transaction: { id: "a" },
		});
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotFoundError);
	});

	it("should update just fine", async () => {
		const result = await updateTransaction.execute({
			dto: {
				amount: 200,
			} as any,
			transaction: { id: transaction.id },
		});
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBeInstanceOf(Transaction);
	});
});
