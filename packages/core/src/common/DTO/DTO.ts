import { validate } from "class-validator";

export default abstract class DTO {
  public async validate() {
    return await validate(this);
  }
}
