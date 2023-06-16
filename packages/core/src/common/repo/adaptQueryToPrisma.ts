import { Query } from "../Query";
import { adaptQueryOptionsToPrisma } from "./adaptQueryOptionsToPrisma";

export function adaptQueryToPrisma<T extends Query<any>>(query: T) {
  const copy = { ...query };
  for (const key in copy) {
    copy[key] = adaptQueryOptionsToPrisma(copy[key] as any);
  }
  return copy;
}
