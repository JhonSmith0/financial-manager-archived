import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import FieldError from "@/common/errors/FieldError";
import ValidationError from "@/common/errors/ValidationError";
import { Expose } from "class-transformer";
import {
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
  @IsDateString()
  @IsOptional()
  public date?: string = new Date().toISOString();

  constructor(data: ClassProperties<CreateTransactionDTO>) {
    super();

    Object.assign(
      this,
      Transformer.plainToInstance(CreateTransactionDTO, data)
    );
  }

  public override async validate() {
    let result = await super.validate();
    if (this.toAccountId === this.fromAccountId) {
      if (result instanceof ValidationError) {
        const e1 = new FieldError(
          "fromAccountId",
          "fromAccountId and toAccountId cannot be equal!"
        );
        const e2 = new FieldError(
          "toAccountId",
          "fromAccountId and toAccountId cannot be equal!"
        );

        (result as ValidationError).fields.push(e1);
        (result as ValidationError).fields.push(e2);

        result.length += 2;
      }
    }

    return result;
  }
}
