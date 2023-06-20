import * as y from "yup"
const loginSchema = y.object({
    email: y.string().email(),
    password: y.string().min(8).max(256),
})
export default loginSchema
