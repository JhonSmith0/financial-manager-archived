import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";
import UserProps from "../types/UserProps";

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
    return Transformer.plainToInstance(SafeUserDTO, data);
  }
}
