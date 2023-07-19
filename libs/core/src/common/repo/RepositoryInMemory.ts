import { Query } from "../Query"
import { BasicRepository } from "./BasicRepository"
import { handleQuery } from "./handleQuery"

export abstract class RepositoryInMemory<
    T extends { id: any },
    K extends T["id"] = T["id"],
    Z extends Partial<T> = Partial<T>
> implements BasicRepository<T, K, Z>
{
    constructor(public data: T[] = []) {}

    public async add(data: T): Promise<void> {
        this.data.push(data)
    }

    public async update(identifier: K, data: Z): Promise<T> {
        const i = this.data.findIndex((obj) => obj.id === identifier)
        const obj = this.data[i]
        return Object.assign(obj, data)
    }

    public async remove<K>(identifier: K): Promise<void> {
        const i = this.data.findIndex((obj) => obj.id === identifier)
        this.data.splice(i, 1)
    }

    public async read<K>(identifier: K): Promise<T | null> {
        const i = this.data.findIndex((obj) => obj.id === identifier)
        if (i < 0) return null
        return this.data[i]
    }

    public async findByQuery(
        query: Query<T>,
        skip?: number | undefined,
        limit?: 1 | undefined
    ): Promise<void | T>
    public async findByQuery(
        query: Query<T>,
        skip?: number | undefined,
        limit?: number | undefined
    ): Promise<T[]>
    public async findByQuery(
        query: any,
        skip?: any,
        limit?: any
    ): Promise<void | T | T[]> {
        return handleQuery(query, this.data, skip, limit)
    }
    public async deleteByQuery(
        query: Query<T>,
        limit: number = 1
    ): Promise<void> {
        if (limit === 0) limit = this.data.length
        let datas = handleQuery(query, this.data, 0, limit)
        if (!Array.isArray(datas)) datas = [datas]
        await Promise.all(datas.map((e) => this.remove(e.id)))
    }
}
