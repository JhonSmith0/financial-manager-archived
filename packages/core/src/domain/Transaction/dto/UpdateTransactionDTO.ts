import DTO from "@/common/DTO/DTO"
import { Transformer } from "@/common/Transformer"
import { IsNotEqualToProperty } from "@/common/Validators/IsNotEqualToProperty"
import { Expose, Transform } from "class-transformer"
import {
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    Min,
} from "class-validator"

export class UpdateTransactionDTO extends DTO {
    @Expose()
    @IsNumber()
    @Min(0)
    @IsOptional()
    public amount: number

    @Expose()
    @IsString()
    @IsOptional()
    @IsNotEqualToProperty("toAccountId")
    public fromAccountId: string

    @Expose()
    @IsString()
    @IsOptional()
    public toAccountId: string

    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(128)
    public description: string

    @Expose()
    @IsDate()
    @IsOptional()
    @Transform(({ value }) => (value instanceof Date ? Date : new Date(value)))
    public date: Date
    constructor(data: UpdateTransactionDTOProps) {
        super()
        const contructor = UpdateTransactionDTO
        const transformed = Transformer.plainToInstance(contructor, data)
        Object.assign(this, transformed)
    }
}

export type UpdateTransactionDTOProps = Partial<
    ClassProperties<UpdateTransactionDTO>
>
