import ExpectedError from "./ExpectedError";

export default class AlreadyExistsError<
  T extends string[]
> extends ExpectedError {
  constructor(message: string, public fields: T) {
    super(message);
  }
}
