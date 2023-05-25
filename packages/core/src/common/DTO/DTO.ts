import { validate } from "class-validator";
import ValidationError from "../errors/ValidationError";
import FieldError from "../errors/FieldError";

export default abstract class DTO {
  public async validate() {
    const obj = await validate(this);

    if (!obj.length) return obj;

    return new ValidationError(
      "Invalid data!",
      obj.map((e) => new FieldError(e.property, "Invalid " + e.property))
    );
  }
}
