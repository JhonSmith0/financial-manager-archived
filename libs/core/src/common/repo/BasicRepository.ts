import { Query } from "../Query"

export interface BasicRepository<T, K, Z> {
    add(data: T): Promise<void>
    update(identifier: K, data: Z): Promise<T>
    remove(identifier: K): Promise<void>
    read(identifier: K): Promise<T | null>

    //
    findByQuery(query: Query<T>, skip?: number, limit?: 1): Promise<T | void>
    findByQuery(query: Query<T>, skip?: number, limit?: number): Promise<T[]>

    deleteByQuery(query: Query<T>, limit?: number): Promise<void>
}
