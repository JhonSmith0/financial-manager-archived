import { BasicRepoMethods } from "@/common/repo/BasicRepoMethods";
import AccountProps from "@/domain/Account/types/AccountProps";
import { TransactionProps } from "./TransactionProps";

export interface TransactionRepository
  extends BasicRepoMethods<TransactionProps> {}
