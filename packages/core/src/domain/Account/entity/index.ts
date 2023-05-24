import Entity from "@/common/Entity/Entity";
import AccountProps from "../types/AccountProps";
import { randomUUID } from "crypto";
import { plainToInstance } from "class-transformer";

export default class Account extends Entity {
  public name: string;
  public userId: string;
  public description: string;

  public static create(data: OptionalProps<AccountProps, "id">) {
    data.id ||= randomUUID();
    return plainToInstance(Account, data);
  }

  public static linkProto(obj: any): Account {
    const inst = Object.create(this.prototype);
    for (const key in obj) {
      inst[key] = obj[key];
    }

    return inst;
  }
}
