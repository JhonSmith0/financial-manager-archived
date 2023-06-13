import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchTransactionDTO extends DTO {
  @Expose()
  @IsOptional()
  @Min(1)
  @IsNumber()
  public page = 1;

  constructor(data: SearchTransactionDTOProps) {
    super();

    Object.assign(
      this,
      Transformer.plainToInstance(SearchTransactionDTO, data, {
        exposeDefaultValues: true,
      })
    );
  }
}

export interface SearchTransactionDTOProps
  extends OptionalProps<ClassProperties<SearchTransactionDTO>, "page"> {}
