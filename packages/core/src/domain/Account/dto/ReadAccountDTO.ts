import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class ReadAccountDTO extends DTO {
  constructor(obj: any) {
    super();
    Object.assign(this, Transformer.plainToInstance(ReadAccountDTO, obj));
  }

  @Expose()
  @IsString()
  public id: string;
}
