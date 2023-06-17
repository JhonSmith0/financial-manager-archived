import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import Account from "@/domain/Account/entity";
import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { fakeAccount, fakeUser } from "../../../setup/faker";

describe("CreateAccountUseCase", () => {
	const accRepo = new AccountRepository();
	const userRepo = new UserRepository();

	const createUser = new CreateUserUseCase(userRepo);
	const createAccount = new CreateAccountUseCase(accRepo);

	const user1 = fakeUser();
	const user2 = fakeUser();

	beforeAll(async () => {
		await createUser.execute(user1);
		await createUser.execute(user2);
	});

	const acc1 = fakeAccount(user1);

	const acc2 = fakeAccount(user2);

	it("should create an account", async () => {
		const result = await createAccount.execute(acc1);
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBeInstanceOf(Account);
	});

	it("should give already exists", async () => {
		const result = await createAccount.execute(acc1);
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(AlreadyExistsError);
	});

	it("should create acc2", async () => {
		const result = await createAccount.execute(acc2);
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBeInstanceOf(Account);
	});
});
