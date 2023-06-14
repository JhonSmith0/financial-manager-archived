import DTO from "@/common/DTO/DTO";
import { Transformer } from "@/common/Transformer";
import { IsNotEqualToProperty } from "@/common/Validators/IsNotEqualToProperty";
import { Expose } from "class-transformer";
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class UpdateTransactionDTO extends DTO<UpdateTransactionDTOProps> {
  @Expose()
  @IsNumber()
  @Min(0)
  @IsOptional()
  public amount: number;

  @Expose()
  @IsString()
  @IsOptional()
  @IsNotEqualToProperty("toAccountId")
  public fromAccountId: string;

  @Expose()
  @IsString()
  @IsOptional()
  public toAccountId: string;

  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(128)
  public description: string;

  @Expose()
  @IsDateString()
  @IsOptional()
  public date: string;
}

export interface UpdateTransactionDTOProps
  extends Partial<ClassProperties<UpdateTransactionDTO>> {}
