import User from "@/domain/User/entity/User";
import { UpdateTransactionDTO } from "../dto/UpdateTransactionDTO";
import { TransactionUseCase } from "./TransactionUseCase";
import Account from "@/domain/Account/entity";
import { Transaction } from "../entity";
import { left, right } from "@/common/ErrorHandlingTypes";
import NotFoundError from "@/common/errors/NotFoundError";
import { linkProto } from "@/common/utils/linkProto";

interface Props {
	dto: UpdateTransactionDTO;
	transaction: { id: Transaction["id"] };
}

export class UpdateTransactionUseCase extends TransactionUseCase {
	public async execute(data: Props) {
		const transaction = await this.transactionRepo.db.findUnique({
			where: {
				id: data.transaction.id,
			},
		});
		if (!transaction)
			return left(new NotFoundError("Transaction not found", ["id"]));

		await this.transactionRepo.db.update({
			where: {
				id: transaction.id,
			},
			data: data.dto,
		});
		return right(Transaction.create({ ...transaction, ...data.dto }));
	}
}
