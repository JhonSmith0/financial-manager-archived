import { ValidatorOptions, validate } from "class-validator"
import FieldError from "../errors/FieldError"
import ValidationError from "../errors/ValidationError"

export default abstract class DTO {
    protected defaultOptions: ValidatorOptions = {
        whitelist: true,
    }

    public async validate(options?: ValidatorOptions) {
        const obj = await validate(this, { ...this.defaultOptions, ...options })

        if (!obj.length) return new ValidationError("Invalid Data!", [])

        return new ValidationError(
            "Invalid data!",
            obj.map((e) => new FieldError(e.property, "Invalid " + e.property))
        )
    }
}
