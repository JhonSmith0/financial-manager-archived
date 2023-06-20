import DTO from "@/common/DTO/DTO"
import { Transformer } from "@/common/Transformer"
import { Expose } from "class-transformer"
import { IsString } from "class-validator"

export class ReadAccountDTO extends DTO {
    constructor(obj: any) {
        super()
        Transformer.assignPlainToInstance(ReadAccountDTO, obj, this)
    }

    @Expose()
    @IsString()
    public id: string
}
