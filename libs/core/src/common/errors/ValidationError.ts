import ExpectedError from "./ExpectedError"
import FieldError from "./FieldError"

export default class ValidationError extends ExpectedError {
    public readonly code = 400
    public length: number
    constructor(message: string, public fields: FieldError[]) {
        super(message)
        this.length = fields.length
    }
}
