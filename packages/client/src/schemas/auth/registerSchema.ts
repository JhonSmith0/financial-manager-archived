import loginSchema from "./loginSchema";
import * as y from "yup";

const registerSchema = loginSchema.shape({
  name: y.string().min(8).max(128),
  photo: y.string().optional(),
});

export default registerSchema;
