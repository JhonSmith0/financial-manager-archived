import { left, right } from "@/common/ErrorHandlingTypes";
import { UseCase } from "@/common/UseCase";
import NotFoundError from "@/common/errors/NotFoundError";
import { Transaction } from "../entity";
import { TransactionRepository } from "../repo/TransactionRepository";

import { linkProto } from "@/common/utils/linkProto";
import { TransactionWithAccounts } from "../entity/TransactionWithAccounts";

export default class ReadTransactionUseCase extends UseCase<string> {
	constructor(private repo: TransactionRepository) {
		super();
	}
	public async execute(id: string) {
		const transaction = await this.repo.db.findUnique({
			where: {
				id,
			},
			include: {
				fromAccount: {},
				toAccount: {},
			},
		});
		if (!transaction)
			return left(new NotFoundError("Transaction not found", ["id"]));

		return right(linkProto(TransactionWithAccounts, transaction));
	}
}
