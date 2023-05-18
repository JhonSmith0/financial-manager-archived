import DTO from "@/core/common/DTO/DTO";
import UserProps from "../types/UserProps";
import { Expose, plainToInstance } from "class-transformer";
import { IsEmail, MinLength, MaxLength } from "class-validator";

export default class CreateUserDTO
  extends DTO
  implements Omit<UserProps, "id">
{
  @Expose()
  @MinLength(8)
  @MaxLength(128)
  public name: string;

  @Expose()
  public photo: string;

  @Expose()
  @IsEmail()
  public email: string;

  @Expose()
  @MinLength(8)
  @MaxLength(256)
  public password: string;

  public static create(data: Omit<CreateUserDTO, keyof DTO>) {
    return plainToInstance(CreateUserDTO, data);
  }
}
