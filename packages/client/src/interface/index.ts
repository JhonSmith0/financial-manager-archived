import loginSchema from "@/schemas/loginSchema";
import registerSchema from "@/schemas/registerSchema";
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
export interface AccountCreate extends Pick<IAccount, "description" | "name"> {}

export interface SearchAccount {
  name: string;
  page: number;
}
