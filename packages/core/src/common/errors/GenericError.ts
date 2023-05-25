import ExpectedError from "./ExpectedError";

export default class GenericError extends ExpectedError {
  constructor(message: string, public code: number) {
    super(message);
  }
}
