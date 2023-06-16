import Entity from "@/common/Entity/Entity";
import { Transformer } from "@/common/Transformer";
import { TransactionProps } from "../types/TransactionProps";
import { Transform } from "class-transformer";

export class Transaction extends Entity {
	public amount: number;
	public description = "";
	public fromAccountId: string;
	public toAccountId: string;
	public userId: string;

	public date: Date = new Date();
	public static create(
		data: OptionalProps<TransactionProps, "id" | "date" | "description">
	) {
		return Transformer.plainToInstance(Transaction, data, {
			excludeExtraneousValues: false,
		});
	}
}
