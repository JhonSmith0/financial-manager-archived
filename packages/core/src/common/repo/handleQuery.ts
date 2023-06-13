import { Query, handlerObj } from "../Query";

/**
 * Utility function to handle queries on inmemory repositories
 */
export function handleQuery<T>(
  query: Query<T>,
  data: T[],
  skip: number,
  limit: 1
): T;
export function handleQuery<T>(
  query: Query<T>,
  data: T[],
  skip: number,
  limit: number
): T[];
export function handleQuery<T>(
  query: Query<T>,
  data: T[],
  skip: number = 0,
  limit: number = 1
) {
  if (limit === 1) return data.find((obj) => handlerObj(obj, query));
  return data.filter((obj) => handlerObj(obj, query)).slice(skip, skip + limit);
}
