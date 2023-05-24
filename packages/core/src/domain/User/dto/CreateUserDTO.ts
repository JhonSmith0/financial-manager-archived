import DTO from "@/common/DTO/DTO";
import UserProps from "../types/UserProps";
import { Expose, plainToInstance } from "class-transformer";
import { IsEmail, MinLength, MaxLength } from "class-validator";
import LoginUserDTO from "./LoginUserDTO";

export default class CreateUserDTO
  extends LoginUserDTO
  implements Omit<UserProps, "id">
{
  @Expose()
  @MinLength(8)
  @MaxLength(128)
  public name: string;

  @Expose()
  public photo: string;

  public static create(data: Omit<CreateUserDTO, keyof DTO>) {
    return plainToInstance(CreateUserDTO, data);
  }
}
