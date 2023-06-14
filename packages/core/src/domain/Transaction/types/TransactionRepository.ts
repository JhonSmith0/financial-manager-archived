import { BasicRepository } from "@/common/repo/BasicRepository";
import { TransactionProps } from "./TransactionProps";

export interface TransactionRepository
  extends BasicRepository<
    TransactionProps,
    TransactionProps["id"],
    Partial<TransactionProps>
  > {}
