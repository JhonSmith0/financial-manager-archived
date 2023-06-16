import Entity from "@/common/Entity/Entity";
import { Transformer } from "@/common/Transformer";
import { TransactionProps } from "../types/TransactionProps";

export class Transaction extends Entity {
  public amount: number;
  public description: string = "";
  public date: string = new Date().toDateString();
  public fromAccountId: string;
  public toAccountId: string;
  public userId: string;

  public static create(
    data: OptionalProps<TransactionProps, "id" | "date" | "description">
  ) {
    return Transformer.plainToInstance(Transaction, data, {
      excludeExtraneousValues: false,
    });
  }
}
