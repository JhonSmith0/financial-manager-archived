import { QueryOptions } from "../Query";

//The query options interface is {equals: ... and nte: ..}
//but prisma can only understand {equals: ... and not: {equals: ....}}
export function adaptQueryOptionsToPrisma<T>(query: QueryOptions<T>) {
  const copy = { ...query };
  if (copy["nte"]) {
    const equals = copy.nte;
    delete copy["nte"];
    //@ts-ignore
    copy.not = { equals };
  }

  return copy as any;
}
