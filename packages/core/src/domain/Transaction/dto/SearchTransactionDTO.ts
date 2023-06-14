import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchTransactionDTO extends DTO<SearchTransactionDTOProps> {
  @Expose()
  @IsOptional()
  @Min(1)
  @IsNumber()
  public page = 1;
}

export interface SearchTransactionDTOProps
  extends OptionalProps<ClassProperties<SearchTransactionDTO>, "page"> {}
