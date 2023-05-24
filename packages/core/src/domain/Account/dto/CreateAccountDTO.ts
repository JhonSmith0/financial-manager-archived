import DTO from "@/common/DTO/DTO";
import AccountProps from "../types/AccountProps";
import { Expose, plainToInstance } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";

export default class CreateAccountDTO
  extends DTO
  implements Omit<AccountProps, "id">
{
  @Expose()
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  public name: string;
  @Expose()
  @IsString()
  public userId: string;
  @Expose()
  @IsString()
  @MaxLength(512)
  public description: string;

  public static create(data: AccountProps) {
    return plainToInstance(CreateAccountDTO, data);
  }
}
