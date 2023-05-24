import loginSchema from "@/schemas/loginSchema";
import * as y from "yup";
export interface ILoginSchema extends y.InferType<typeof loginSchema> {}
