declare global {
    declare type Matching<T, V> = {
        [K in keyof T as T[K] extends V ? K : never]: T[K]
    }

    declare type ClassMethods<T> = Matching<T, Function>
    declare type ClassProperties<T> = Omit<T, keyof ClassMethods<T>>

    declare type OptionalProps<T, K extends keyof T> = Omit<T, K> &
        Partial<Pick<T, K>>

    export declare interface Bao {
        name: string
    }

    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV: "dev" | "prod" | "test"
            readonly BCRYPT_SALT: number
            readonly JWT_EXPIRATION_TIME: string
            readonly JWT_SECRET_KEY: string
            readonly MYSQL_ROOT_PASSWORD: number
            readonly DATABASE_URL: string
            readonly CLIENT_HOST: string
            readonly CLIENT_PORT: number
            readonly DATABASE_HOST: string
            readonly DATABASE_PORT: number
            readonly DATABASE_NAME: string
            readonly MYSQL_USER: string
            readonly MYSQL_PASSWORD: number
        }
    }
}

export {}
