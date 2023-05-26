import DTO from "@/common/DTO/DTO";
import { Expose, plainToInstance } from "class-transformer";
import UserProps from "../types/UserProps";
import plainToInstanceConfigs from "@/common/configs/plainToInstanceConfigs";

export default class SafeUserDTO extends DTO {
  @Expose()
  public name: string;
  @Expose()
  public email: string;
  @Expose()
  public photo: string;
  @Expose()
  public id: string;

  public static create(data: UserProps) {
    return plainToInstance(SafeUserDTO, data, {
      ...plainToInstanceConfigs,
      excludeExtraneousValues: true,
    });
  }
}
