import { BasicRepoMethods } from "@/common/repo/BasicRepoMethods";
import { TransactionProps } from "./TransactionProps";
import { Transaction } from "../entity";

export interface TransactionRepository
  extends BasicRepoMethods<TransactionProps> {
  update(
    id: TransactionProps["id"],
    data: Partial<TransactionProps>
  ): Promise<void>;
  remove(id: Transaction["id"]): Promise<void>;
}
