declare global {
  export type Matching<T, V> = {
    [K in keyof T as T[K] extends V ? K : never]: T[K];
  };

  export type ClassMethods<T> = Matching<T, Function>;
  export type ClassProperties<T> = Omit<T, keyof ClassMethods<T>>;

  export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;
}

export {};
