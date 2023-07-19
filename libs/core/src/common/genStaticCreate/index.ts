import { isAsyncFunction } from "util/types"
import { Transformer } from "../Transformer"
import User from "@/domain/User/entity/User"

type FunctionType<T, K> = (data: ClassProperties<InstanceType<T>>) => K

//@ts-ignore
type InstanceType<T extends any> = T["prototype"]

type CreateType<T, K> = { create: FunctionType<T, K> }

export function genStaticCreate<
    T,
    K extends InstanceType<T>,
    Z extends ClassProperties<K>
>(cl: T, pipe?: (instance: K) => K): K
// export function genStaticCreate<
//   T,
//   K extends InstanceType<T>,
//   Z extends ClassProperties<K>
// >(cl: T, pipe?: (instance: K) => K): T & CreateType<T, K>;

export function genStaticCreate<
    T,
    K extends InstanceType<T>,
    Z extends ClassProperties<K>
>(cl: T, pipe?: (instance: K) => Promise<K>): T & CreateType<T, Promise<K>>

export function genStaticCreate<
    T,
    K extends InstanceType<T>,
    Z extends ClassProperties<K>
>(cl: T, pipe?: (data: K) => K) {
    const pipeIsAsync = isAsyncFunction(pipe)

    let createFunction: ((data: Z) => Promise<K>) | ((data: Z) => K)

    if (pipeIsAsync && pipe) {
        createFunction = async (data: Z) => {
            const inst = Transformer.plainToInstance(cl as any, data)
            return await pipe(inst)
        }
    } else {
        createFunction = (data: Z) =>
            Transformer.plainToInstance(cl as any, data)
    }

    //@ts-ignore
    cl.prototype.create = createFunction

    return cl
}
