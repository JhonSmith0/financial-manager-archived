import CreateUserDTO from "@/domain/User/dto/CreateUserDTO";
import User from "@/domain/User/entity/User";

describe("LoginUserDTO", () => {
	const data = User.dataForTest;

	it("should pass", async () => {
		expect(await CreateUserDTO.create(data).validate()).toHaveLength(0);
	});
	it("should give error on name (to small)", async () => {
		expect(
			await CreateUserDTO.create({ ...data, name: "a".repeat(7) }).validate()
		).toHaveLength(1);
	});

	it("should give error on name (to long)", async () => {
		expect(
			await CreateUserDTO.create({ ...data, name: "a".repeat(257) }).validate()
		).toHaveLength(1);
	});
});
