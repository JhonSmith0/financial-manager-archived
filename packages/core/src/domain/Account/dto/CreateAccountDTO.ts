import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";

export default class CreateAccountDTO extends DTO {
  @Expose()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  public name: string;

  @Expose()
  @IsString()
  @MaxLength(128)
  public description: string;

  public static create(data: ClassProperties<CreateAccountDTO>) {
    return Transformer.plainToInstance(CreateAccountDTO, data);
  }
}
