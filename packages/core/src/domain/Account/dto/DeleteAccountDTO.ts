import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class DeleteAccountDTO extends DTO {
  @Expose()
  @IsString()
  public id: string;

  public static create(data: ClassProperties<DeleteAccountDTO>) {
    return Transformer.plainToInstance(DeleteAccountDTO, data);
  }
}
