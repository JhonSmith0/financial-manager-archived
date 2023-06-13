import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchAccountDTO extends DTO {
  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsString()
  @IsOptional()
  public description: string = "";

  @IsNumber()
  @Expose()
  @Min(1)
  @IsOptional()
  public page: number = 1;

  public static create(data: SearchAccountDTOProps) {
    data.page &&= +data.page;
    return Transformer.plainToInstance(SearchAccountDTO, data, {
      exposeDefaultValues: true,
    });
  }
}

export interface SearchAccountDTOProps
  extends OptionalProps<
    ClassProperties<SearchAccountDTO>,
    "page" | "description"
  > {}
