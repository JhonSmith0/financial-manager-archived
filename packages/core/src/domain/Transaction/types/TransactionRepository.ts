import { BasicRepoMethods } from "@/common/repo/BasicRepoMethods";
import { TransactionProps } from "./TransactionProps";
import { Transaction } from "../entity";
import { Query } from "@/common/Query";

export interface TransactionRepository
  extends BasicRepoMethods<TransactionProps> {
  update(
    id: TransactionProps["id"],
    data: Partial<TransactionProps>
  ): Promise<void>;
  remove(id: Transaction["id"]): Promise<void>;
  findByQuery<T extends TransactionProps>(
    query: Query<T>,
    skip?: number,
    limit?: 1
  ): Promise<TransactionProps | void>;
  findByQuery<T extends TransactionProps>(
    query: Query<T>,
    skip?: number,
    limit?: number
  ): Promise<TransactionProps[]>;
  deleteByQuery<T extends TransactionProps>(
    query: Query<T>,
    limit?: number
  ): Promise<void>;
}
