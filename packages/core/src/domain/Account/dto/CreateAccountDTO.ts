import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";
import AccountProps from "../types/AccountProps";

export default class CreateAccountDTO
  extends DTO
  implements Omit<AccountProps, "id">
{
  @Expose()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  public name: string;
  @Expose()
  @IsString()
  public userId: string;
  @Expose()
  @IsString()
  @MaxLength(128)
  public description: string;

  public static create(data: OptionalProps<AccountProps, "id">) {
    return Transformer.plainToInstance(CreateAccountDTO, data);
  }
}
