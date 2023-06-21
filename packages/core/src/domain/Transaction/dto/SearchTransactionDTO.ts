import DTO from "@/common/DTO/DTO"
import { Transformer } from "@/common/Transformer"
import { Expose } from "class-transformer"
import { IsNumber, IsOptional, IsString, Min } from "class-validator"

export class SearchTransactionDTO extends DTO {
    @Expose()
    @Min(1)
    @IsNumber()
    @IsOptional()
    public page: number = 1
    constructor(data: SearchTransactionDTOProps) {
        super()
        const contructor = SearchTransactionDTO
        const transformed = Transformer.plainToInstance(contructor, data)
        Object.assign(this, transformed)
    }
}

export interface SearchTransactionDTOProps
    extends OptionalProps<ClassProperties<SearchTransactionDTO>, "page"> {}
