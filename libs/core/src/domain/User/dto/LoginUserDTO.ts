import DTO from "@/common/DTO/DTO"
import { Transformer } from "@/common/Transformer"
import { Expose } from "class-transformer"
import { IsEmail, MaxLength, MinLength } from "class-validator"
import UserProps from "../types/UserProps"

export default class LoginUserDTO
    extends DTO
    implements Pick<UserProps, "email" | "password">
{
    @Expose()
    @IsEmail()
    public email: string
    @Expose()
    @MinLength(8)
    @MaxLength(256)
    public password: string

    public static create(data: ClassProperties<LoginUserDTO>) {
        return Transformer.plainToInstance(LoginUserDTO, data)
    }
}
