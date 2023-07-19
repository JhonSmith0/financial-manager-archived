import { Query } from "../Query"

export interface BasicRepoMethods<T> {
    findByQuery(query: Query<T>, skip?: number, limit?: 1): Promise<T | void>
    findByQuery(query: Query<T>, skip?: number, limit?: number): Promise<T[]>

    add(data: T): Promise<void>
}
