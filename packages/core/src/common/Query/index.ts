export type QueryOptions<T> = {
    equals?: T
    nte?: T
    startsWith?: T
    endsWith?: T
}

export type Query<T> = {
    [key in keyof T]?: QueryOptions<T[key]>
}

const strategy: QueryOptions<(candidate: any, value: any) => boolean> = {
    //@ts-ignore
    equals(candidate: any, value: any) {
        return candidate === value
    },
    endsWith(candidate: any, value: any) {
        return value?.endsWith?.(candidate)
    },
    nte(candidate: any, value: any) {
        return value !== candidate
    },
    startsWith(candidate: any, value: any) {
        return value?.startsWith?.(candidate)
    },
}

export function handlerProp<T>(value: T, options: QueryOptions<T>) {
    return Object.entries(options).every(([strategyKey, candidate]) => {
        //@ts-ignore
        return strategy[strategyKey](candidate, value)
    })
}
export function handlerObj<T>(obj: T, query: Query<T>) {
    return Object.entries(query).every(([prop, options]) => {
        //@ts-ignore
        const value = obj[prop]

        //@ts-ignore
        const result = handlerProp(value, options)
        return result
    })
}
