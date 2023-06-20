import ExpectedError from "./ExpectedError"

export default class AlreadyExistsError<
    T extends string[]
> extends ExpectedError {
    public readonly code = 409
    constructor(message: string, public fields: T) {
        super(message)
    }
}
