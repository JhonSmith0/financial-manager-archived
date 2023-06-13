import User from "@/domain/User/entity/User";
import { UpdateTransactionDTO } from "../dto/UpdateTransactionDTO";
import { TransactionUseCase } from "./TransactionUseCase";

interface Props {
  dto: UpdateTransactionDTO;
  user: { id: User["id"] };
}

export class UpdateTransactionUseCase extends TransactionUseCase {
  public async execute(data: Props) {
    throw new Error("Method not implemented.");
  }
}
