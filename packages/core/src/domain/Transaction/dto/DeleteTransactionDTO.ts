import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";

export class DeleteTransactionDTO extends DTO {
  @Expose()
  public id: string;
  constructor(data: DeleteTransactionDTOProps) {
    super();
    const contructor = DeleteTransactionDTO;
    const transformed = Transformer.plainToInstance(contructor, data);
    Object.assign(this, transformed);
  }
}

export interface DeleteTransactionDTOProps
  extends ClassProperties<DeleteTransactionDTO> {}
