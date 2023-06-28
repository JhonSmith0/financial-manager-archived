import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator"

export function ItemId() {
    return function (obj: Object, prop: string) {
        IsString()(obj, prop)
    }
}

export function ItemName() {
    return function (obj: Object, prop: string) {
        MinLength(3)(obj, prop)
        MaxLength(100)(obj, prop)
    }
}

export function ItemPrice() {
    return function (obj: Object, prop: string) {
        IsNumber()(obj, prop)
        Min(0)(obj, prop)
    }
}

export function ItemAmount() {
    return function (obj: Object, prop: string) {
        IsNumber()(obj, prop)
        Min(1)(obj, prop)
    }
}
