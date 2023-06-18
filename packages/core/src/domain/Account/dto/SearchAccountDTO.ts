import DTO from "@/common/DTO/DTO"
import { Transformer } from "@/common/Transformer"
import { Expose } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

export class SearchAccountDTO extends DTO {
    @Expose()
    @IsString()
    @IsOptional()
    public name: string = ""

    @Expose()
    @IsString()
    @IsOptional()
    public description: string = ""

    public static create(data: SearchAccountDTOProps) {
        return Transformer.plainToInstance(SearchAccountDTO, data, {
            exposeDefaultValues: true,
        })
    }
}

export interface SearchAccountDTOProps
    extends OptionalProps<ClassProperties<SearchAccountDTO>, "description"> {}
