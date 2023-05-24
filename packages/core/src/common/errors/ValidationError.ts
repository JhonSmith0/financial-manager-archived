import ExpectedError from "./ExpectedError";

export default class ValidationError extends ExpectedError {
  public readonly code = 400;
  public length: number;
  constructor(message: string, public fields: string[]) {
    super(message);
    this.length = fields.length;
  }
}
