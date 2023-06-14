import { validate } from "class-validator";
import ValidationError from "../errors/ValidationError";
import FieldError from "../errors/FieldError";
import { Transformer } from "../Transformer";
import { ClassTransformOptions } from "class-transformer";

export default abstract class DTO<T = any> {
  constructor(data: ClassProperties<T>, options?: ClassTransformOptions) {
    //@ts-ignore
    const contructor = this.constructor as any;
    Object.assign(this, Transformer.plainToInstance(contructor, data, options));
  }

  public async validate() {
    const obj = await validate(this);

    if (!obj.length) return new ValidationError("Invalid Data!", []);

    return new ValidationError(
      "Invalid data!",
      obj.map((e) => new FieldError(e.property, "Invalid " + e.property))
    );
  }
}
