import { left, right } from "@/common/ErrorHandlingTypes";
import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import Account from "../entity";
import { AccountRepository } from "../repo/AccountRepository";
import AccountProps from "../types/AccountProps";

export default class CreateAccountUseCase {
	constructor(private repo: AccountRepository) {}

	public async execute(data: OptionalProps<AccountProps, "id">) {
		const account = Account.create(data);

		if (await this.repo.db.findUnique({ where: { id: account.id } }))
			return left(new AlreadyExistsError("Account already exists!", ["name"]));

		await this.repo.db.create({
			data: {
				description: account.description,
				id: account.id,
				name: account.name,
				user: {
					connect: {
						id: account.userId,
					},
				},
			},
		});
		return right(account);
	}
}
