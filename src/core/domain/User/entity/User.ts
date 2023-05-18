import { plainToInstance } from "class-transformer";
import UserProps from "../types/UserProps";
import Hash from "@/core/common/Hash/Hash";
import { randomUUID } from "crypto";

export default class User extends UserProps {
  public async comparePassword(candidate: string) {
    return await Hash.compareTo(this.password, candidate);
  }

  public static async create(data: Omit<UserProps, "id">) {
    const obj = plainToInstance(User, data);

    obj.password = await Hash.hash(obj.password, 12);
    obj.id ||= randomUUID();

    return obj;
  }
}
