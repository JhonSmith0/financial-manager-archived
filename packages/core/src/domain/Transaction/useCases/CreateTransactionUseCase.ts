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
		const acc = Transaction.create({ ...dto, userId: user.id });
		await this.transactionRepo.db.create({ data: acc });
		return right(acc);
	}
}
