import loginSchema from "@/schemas/auth/loginSchema";
import newTransactionSchema from "@/schemas/transaction/newTransactionSchema";
import registerSchema from "@/schemas/auth/registerSchema";
import * as y from "yup";
export interface ILoginSchema extends y.InferType<typeof loginSchema> {}
export interface IRegisterSchema extends y.InferType<typeof registerSchema> {}

export interface IUser {
  name: string;
  id: string;
  photo: string;
  email: string;
}

export interface IAccount {
  userId: string;
  description: string;
  name: string;
  id: string;
}

export interface ITransaction {
  date: string;
  description: string;
  amount: number;
  id: string;
  fromAccountId: string;
  toAccountId: string;
}

export interface TransactionCreate
  extends y.InferType<typeof newTransactionSchema> {}
export interface GetTransactions {
  page?: number;
}

export interface AccountCreate extends Pick<IAccount, "description" | "name"> {}

export interface SearchAccount {
  name: string;
  page: number;
}
