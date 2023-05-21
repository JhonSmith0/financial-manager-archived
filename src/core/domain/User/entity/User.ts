import { plainToInstance } from "class-transformer";
import UserProps from "../types/UserProps";
import Hash from "@/core/common/Hash/Hash";
import { randomUUID } from "crypto";
import Entity from "@/core/common/Entity/Entity";

export default class User extends Entity {
  public name: string;
  public photo: string;
  public email: string;
  public password: string;

  public static dataForTest: UserProps = {
    email: "test@email.com",
    id: randomUUID(),
    name: "test user",
    password: "12345678",
    photo: "photo.png",
  };

  public async comparePassword(candidate: string) {
    return await Hash.compareTo(this.password, candidate);
  }

  public static fromPlain(data: UserProps) {
    return plainToInstance(User, data);
  }

  public static async create(data: Omit<UserProps, "id">) {
    const obj = plainToInstance(User, data);

    obj.password = await Hash.hash(obj.password, 12);
    obj.id ||= randomUUID();

    return obj;
  }
}
