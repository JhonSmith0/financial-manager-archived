import Entity from "@/common/Entity/Entity";
import { Transformer } from "@/common/Transformer";
import { randomUUID } from "crypto";
import { TransactionProps } from "../types/TransactionProps";

export class Transaction extends Entity {
  public id: string;
  public amount: number;
  public description: string;
  public date: string;
  public fromAccountId: string;
  public toAccountId: string;

  public static create(data: OptionalProps<TransactionProps, "id" | "date">) {
    data.id ||= randomUUID();
    data.date ||= new Date().toISOString();

    return Transformer.plainToInstance(Transaction, data, {
      excludeExtraneousValues: false,
    });
  }
}
