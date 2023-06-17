import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import NotFoundError from "@/common/errors/NotFoundError";
import UpdateAccountDTO from "@/domain/Account/dto/UpdateAccountDTO";
import Account from "@/domain/Account/entity";
import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";
import { DeleteAccountUseCase } from "@/domain/Account/useCases/DeleteAccountUseCase";
import { UpdateAccountUseCase } from "@/domain/Account/useCases/UpdateAccountUseCase";
import User from "@/domain/User/entity/User";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { usersForTests } from "../../../setup";

describe("UpdateAccountUseCase", () => {
	const accRepo = new AccountRepository();
	const userRepo = new UserRepository();

	const createUser = new CreateUserUseCase(userRepo);
	const createAccount = new CreateAccountUseCase(accRepo);
	const removeAccount = new DeleteAccountUseCase(accRepo);

	const useCase = new UpdateAccountUseCase(accRepo);
	const user = User.create(User.dataForTest);

	beforeAll(async () => {
		await createUser.execute(user as any);

		for (const user of usersForTests) {
			await createUser.execute(user);
		}
	});

	//Try to update an account who doesnot exist
	it("should give not found error", async () => {
		const result = await useCase.execute({
			user: { id: "kjhjkhjk" },
			dto: {
				id: "hjkhkjh",
			},
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotFoundError);
	});

	//Try to update an account but that will make it a duplicate
	it("should give already exists error", async () => {
		const acc1 = Account.create({
			description: "Test",
			name: "Hello!",
			userId: usersForTests[0].id,
		});
		const acc2 = Account.create({
			description: "Test",
			name: "Hello2!",
			userId: usersForTests[0].id,
		});

		await createAccount.execute(acc1);
		await createAccount.execute(acc2);

		const result = await useCase.execute({
			dto: {
				id: acc2.id,
				name: acc1.name,
			},
			user: {
				id: acc2.userId,
			},
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(AlreadyExistsError);

		await removeAccount.execute({ dto: { id: acc1.id } });
	});

	it("should update and block id change", async () => {
		const acc = Account.create({
			description: "Test",
			name: "Hello!",
			userId: usersForTests[0].id,
		});

		await createAccount.execute(acc);

		const dto = UpdateAccountDTO.create({
			id: acc.id,
			description: "updated desc",
			name: "updated name",
			userId: usersForTests[0].id,
		} as any);

		const result = await useCase.execute({
			dto,
			user: { id: acc.id },
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toMatchObject(dto);

		await removeAccount.execute({ dto: { id: acc.id } });
	});
});
