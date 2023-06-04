import Entity from "@/common/Entity/Entity";
import { TransactionProps } from "../types/TransactionProps";
import { Transformer } from "@/common/Transformer";
import { randomUUID } from "crypto";

export class Transaction extends Entity {
  public id: string;
  public amount: number;
  public description: string;
  public date: Date;
  public fromAccountId: string;
  public toAccountId: string;

  public static create(data: OptionalProps<TransactionProps, "id" | "date">) {
    data.id ||= randomUUID();
    data.date ||= new Date();

    return Transformer.plainToInstance(Transaction, data, {
      excludeExtraneousValues: false,
    });
  }
}
