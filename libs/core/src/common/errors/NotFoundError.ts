import ExpectedError from "./ExpectedError"

export default class NotFoundError extends ExpectedError {
    public readonly code = 404
    constructor(message: string, public fields: string[]) {
        super(message)
    }
}
