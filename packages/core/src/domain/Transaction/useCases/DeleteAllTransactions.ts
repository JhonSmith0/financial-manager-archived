import { UseCase } from "@/common/UseCase";
import { TransactionRepository } from "../repo/TransactionRepository";

import { right } from "@/common/ErrorHandlingTypes";
import { TransactionProps } from "../types/TransactionProps";

type Props = Partial<TransactionProps>;

export class DeleteAllTransactions extends UseCase<Props> {
	constructor(private repo: TransactionRepository) {
		super();
	}

	public async execute(data: Props) {
		await this.repo.db.delete({
			where: data,
		});
		return right(null);
	}
}
