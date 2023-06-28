import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator"

export function TransactionId() {
    return function (obj: Object, prop: string) {
        IsString()(obj, prop)
    }
}
