import DTO from "@/common/DTO/DTO"
import { Transformer } from "@/common/Transformer"
import { Expose } from "class-transformer"
import { MaxLength, MinLength } from "class-validator"
import UserProps from "../types/UserProps"
import LoginUserDTO from "./LoginUserDTO"

export default class CreateUserDTO
    extends LoginUserDTO
    implements Omit<UserProps, "id">
{
    @Expose()
    @MinLength(8)
    @MaxLength(128)
    public name: string

    @Expose()
    public photo: string

    public static create(data: Omit<CreateUserDTO, keyof DTO>) {
        return Transformer.plainToInstance(CreateUserDTO, data)
    }
}
