declare global {
    declare type Matching<T, V> = {
        [K in keyof T as T[K] extends V ? K : never]: T[K]
    }

    declare type ClassMethods<T> = Matching<T, Function>
    declare type ClassProperties<T> = Omit<T, keyof ClassMethods<T>>

    declare type OptionalProps<T, K extends keyof T> = Omit<T, K> &
        Partial<Pick<T, K>>

    interface ProcessEnv {
        DB_URL_TEST: string
        DB_URL_PROD: string
        DB_URL_DEV: string
        NODE_ENV: "dev" | "prod" | "test"
    }

    export declare interface Bao {
        name: string
    }

    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "dev" | "prod" | "test"
            DATABASE_URL: string
        }
    }
}

export {}
