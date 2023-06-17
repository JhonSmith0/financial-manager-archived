import { UseCase } from "@/common/UseCase";
import User from "@/domain/User/entity/User";
import { DeleteAccountDTO } from "../dto/DeleteAccountDTO";
import NotFoundError from "@/common/errors/NotFoundError";
import { left, right } from "@/common/ErrorHandlingTypes";
import { AccountRepository } from "../repo/AccountRepository";

interface Prop {
	user?: { id: User["id"] };
	dto: ClassProperties<DeleteAccountDTO>;
}

export class DeleteAccountUseCase extends UseCase<Prop> {
	constructor(private repo: AccountRepository) {
		super();
	}

	public async execute({ dto, user }: Prop) {
		const exists = await this.repo.db.findUnique({
			where: {
				id: dto.id,
			},
		});

		if (!exists)
			return left(
				new NotFoundError(`Account with id ${dto.id} dont exist!`, ["id"])
			);

		await this.repo.db.delete({ where: { id: dto.id } });
		return right(null);
	}
}
