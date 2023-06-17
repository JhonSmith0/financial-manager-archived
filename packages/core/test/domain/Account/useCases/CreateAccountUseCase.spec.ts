import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import Account from "@/domain/Account/entity";
import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import User from "@/domain/User/entity/User";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";

describe("CreateAccountUseCase", () => {
	const accRepo = new AccountRepository();
	const userRepo = new UserRepository();

	const createUser = new CreateUserUseCase(userRepo);
	const createAccount = new CreateAccountUseCase(accRepo);

	const user1 = User.create(User.dataForTest);
	const user2 = User.create({...User.dataForTest, email: "8974987@email.com", id: undefined});


	beforeAll(async () => {
		await createUser.execute(user1);
		await createUser.execute(user2);
	});

	const acc1 = Account.create({
		description: "",
		name: "123456",
		userId: user1.id,
	});

	const acc2 = Account.create({
		description: "",
		name: "1456",
		userId: user2.id , 
	});



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
