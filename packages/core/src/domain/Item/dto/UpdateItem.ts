import { ValidatorOptions } from "class-validator"
import { CreateItemDTO } from "./CreateItem"

export class UpdateItemDTO extends CreateItemDTO {
    protected override defaultOptions: ValidatorOptions = {
        ...super.defaultOptions,
        skipMissingProperties: true,
    }
    constructor(data: Partial<ClassProperties<UpdateItemDTO>>) {
        super(data as any)
        Object.assign(this, data)
    }
}
