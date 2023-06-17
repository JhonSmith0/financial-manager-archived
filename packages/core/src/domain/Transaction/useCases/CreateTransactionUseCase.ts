import { CreateTransactionDTO } from "@/domain/Transaction/dto/CreateTransactionDTO";
import { Transaction } from "@/domain/Transaction/entity";
import User from "@/domain/User/entity/User";

import { right } from "@/common/ErrorHandlingTypes";
import { TransactionUseCase } from "./TransactionUseCase";

interface Props {
	dto: ClassProperties<CreateTransactionDTO>;
	user: { id: User["id"] };
}

export class CreateTransactionUseCase extends TransactionUseCase {
	public async execute({ dto, user }: Props) {
		const transaction = Transaction.create({ ...dto, userId: user.id });
		const data = dto;
		await this.transactionRepo.db.create({
			data: {
				amount: transaction.amount,
				date: transaction.date,
				description: transaction.description,
				id: transaction.id,

				fromAccount: {
					connect: {
						id: data.fromAccountId,
					},
				},
				toAccount: {
					connect: {
						id: data.toAccountId,
					},
				},
				user: {
					connect: {
						id: user.id,
					},
				},
			},
		});
		return right(Transaction.create(transaction));
	}
}
