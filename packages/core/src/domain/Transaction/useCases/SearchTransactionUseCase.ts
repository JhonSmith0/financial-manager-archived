import { UseCase } from "@/common/UseCase";
import { TransactionRepository } from "../repo/TransactionRepository";

import { right } from "@/common/ErrorHandlingTypes";
import User from "@/domain/User/entity/User";
import { SearchTransactionDTO } from "../dto/SearchTransactionDTO";
import { TransactionProps } from "../types/TransactionProps";

interface Props {
	dto: SearchTransactionDTO;
	user: { id: User["id"] };
}

export class SearchTransactionUseCase extends UseCase<Props> {
	private perPage = 300;

	constructor(private repo: TransactionRepository) {
		super();
	}

	public async execute(data: Props) {
		const results = (await this.repo.db.findMany({
			where: {
				userId: data.user.id,
			},
			include: {
				fromAccount: {},
				toAccount: {},
			},
		})) as TransactionProps[];

		return right({
			results,
			page: data.dto.page,
		});
	}
}
