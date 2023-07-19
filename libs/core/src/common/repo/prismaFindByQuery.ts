import { Query } from "../Query"
import { adaptQueryOptionsToPrisma } from "./adaptQueryOptionsToPrisma"

export async function prismaFindByQuery<T>(
    query: Query<T>,
    limit: number,
    skip: number,
    db: any
) {
    for (const key in query) {
        query[key] = adaptQueryOptionsToPrisma(query[key] as any)
    }

    if (limit === 1)
        return (await db.findFirst({
            where: query,
            skip,
            take: limit,
        })) as any

    return (await db.findMany({ where: query, skip, take: limit })) as any
}
