import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { IsNotEqualToProperty } from "@/common/Validators/IsNotEqualToProperty";
import { Expose } from "class-transformer";
import {
	IsDate,
	IsDateString,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	Min,
} from "class-validator";

export class CreateTransactionDTO extends DTO {
	@Expose()
	@IsNumber()
	@Min(0)
	public amount: number;

	@Expose()
	@IsString()
	@IsNotEqualToProperty("toAccountId")
	public fromAccountId: string;

	@Expose()
	@IsString()
	public toAccountId: string;

	@Expose()
	@IsString()
	@IsOptional()
	@MaxLength(128)
	public description?: string = "";

	@Expose()
	@IsDate()
	@IsOptional()
	public date?: Date = new Date();
	constructor(data: CreateTransactionDTOProps) {
		super();
		Transformer.assignPlainToInstance(CreateTransactionDTO, data, this);
	}
}

export type CreateTransactionDTOProps = ClassProperties<
		OptionalProps<CreateTransactionDTO, "description" | "date">
	>
