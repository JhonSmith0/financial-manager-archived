import ExpectedError from "./ExpectedError";

export default class NotFoundError extends ExpectedError {
  constructor(message: string, public fields: string[]) {
    super(message);
  }
}
