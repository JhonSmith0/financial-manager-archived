import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class SearchAccountDTO extends DTO {
  @Expose()
  @IsString()
  public name?: string;
  @Expose()
  @IsString()
  public description?: string;

  public static create(data: ClassProperties<SearchAccountDTO>) {
    return Transformer.plainToInstance(SearchAccountDTO, data);
  }
}
