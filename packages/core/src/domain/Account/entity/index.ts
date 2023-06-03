import Entity from "@/common/Entity/Entity";
import { Transformer } from "@/common/Transformer";
import { randomUUID } from "crypto";
import AccountProps from "../types/AccountProps";

export default class Account extends Entity {
  public name: string;
  public userId: string;
  public description: string;

  public static create(data: OptionalProps<AccountProps, "id">) {
    data.id ||= randomUUID();
    return Transformer.plainToInstance(Account, data, {
      excludeExtraneousValues: false,
    });
  }

  public static linkProto(obj: any): Account {
    const inst = Object.create(this.prototype);
    for (const key in obj) {
      inst[key] = obj[key];
    }

    return inst;
  }
}
