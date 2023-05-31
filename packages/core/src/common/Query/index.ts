export type QueryOptions<T> = { eq?: T; nte?: T; startsWith?: T; endsWith?: T };

export type Query<T> = {
  [key in keyof T]?: QueryOptions<T[key]>;
};
