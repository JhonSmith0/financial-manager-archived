import JWT from "@/common/JWT/JWT";
import GenericError from "@/common/errors/GenericError";
import LoginController from "@/controllers/auth/LoginController";
import LoginUserDTO from "@/domain/User/dto/LoginUserDTO";
import User from "@/domain/User/entity/User";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";

describe("LoginController", () => {
	const repo = new UserRepository();
	const createUser = new CreateUserUseCase(repo);

	const user = User.create(User.dataForTest);
	const controller = new LoginController(repo, new JWT("1"));

	beforeAll(async () => {
		await createUser.execute(user);
	});

	it("should return a jwt", async () => {
		const result = await controller.handle(LoginUserDTO.create(user));

		expect(result.isRight()).toBeTruthy();
		expect(typeof result.value).toBe("string");
	});
	it("should give invalid data", async () => {
		const result = await controller.handle(
			LoginUserDTO.create({ ...user, password: "18767867864" })
		);

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(GenericError);
	});
});
