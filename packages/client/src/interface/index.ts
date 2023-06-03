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
