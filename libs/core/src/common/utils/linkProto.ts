import { ClassConstructor } from "class-transformer"

export function linkProto<T>(
    cl: ClassConstructor<T>,
    data: ClassProperties<T>
) {
    const obj = Object.create(cl.prototype)
    Object.assign(obj, data)

    return obj as T
}
