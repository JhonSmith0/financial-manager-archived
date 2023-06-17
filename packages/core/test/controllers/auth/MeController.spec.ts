import JWT from "@/common/JWT/JWT";
import GenericError from "@/common/errors/GenericError";
import MeController from "@/controllers/auth/MeController";
import SafeUserDTO from "@/domain/User/dto/SafeUser";
import User from "@/domain/User/entity/User";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";

describe("MeController", () => {
	const jwt = new JWT("1");
	const repo = new UserRepository();
	const createUser = new CreateUserUseCase(repo);
	const user = User.create(User.dataForTest);
	const controller = new MeController(repo, jwt);

	let payload: { id: User["id"] };
	let expiredToken: string;
	let activeToken: string;

	beforeAll(async () => {
		payload = { id: user.id };
		expiredToken = jwt.encode(payload, { expiresIn: 0, algorithm: "none" });
		activeToken = jwt.encode(payload, {
			expiresIn: "1d",
		} as any);
		await createUser.execute(user);
	});

	it("should throw", () => {
		expect(
			async () => await controller.handle(expiredToken)
		).rejects.toThrowError(GenericError);
	});

	it("should give an error because user dont exist", () => {
		expect(controller.handle(jwt.encode({ id: "123" }))).rejects.toBeInstanceOf(
			GenericError
		);
	});
	it("should pass and be instanceof safeUser", async () => {
		expect(await controller.handle(activeToken)).toBeInstanceOf(SafeUserDTO);
	});
});
