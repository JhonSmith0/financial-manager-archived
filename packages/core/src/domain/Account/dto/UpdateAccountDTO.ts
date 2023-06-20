import DTO from "@/common/DTO/DTO"
import { Transformer } from "@/common/Transformer"
import { Expose } from "class-transformer"
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator"

export default class UpdateAccountDTO extends DTO {
    @Expose()
    @IsString()
    @MinLength(4)
    @MaxLength(24)
    @IsOptional()
    public name?: string

    @Expose()
    @IsString()
    @MaxLength(128)
    @IsOptional()
    public description?: string = ""

    @Expose()
    @IsNotEmpty()
    @IsString()
    public id: string

    public static create(data: ClassProperties<UpdateAccountDTO>) {
        return Transformer.plainToInstance(UpdateAccountDTO, data)
    }
}
