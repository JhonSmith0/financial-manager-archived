import loginSchema from "@/schemas/loginSchema";
import registerSchema from "@/schemas/registerSchema";
import * as y from "yup";
export interface ILoginSchema extends y.InferType<typeof loginSchema> {}
export interface IRegisterSchema extends y.InferType<typeof registerSchema> {}
