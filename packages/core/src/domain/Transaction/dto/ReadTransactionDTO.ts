import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class ReadTransactionDTO extends DTO {
  @Expose()
  @IsString()
  public id: string;

  constructor(data: ReadTransactionDTOProps) {
    super();
    Transformer.assignPlainToInstance(ReadTransactionDTO, data, this);
  }
}

export interface ReadTransactionDTOProps
  extends ClassProperties<ReadTransactionDTO> {}
