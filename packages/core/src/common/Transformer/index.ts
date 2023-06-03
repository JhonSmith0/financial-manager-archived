import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from "class-transformer";

export class Transformer {
  public static toInstanceConfigs: ClassTransformOptions = {
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  };

  public static plainToInstance<K, T>(
    cl: ClassConstructor<T>,
    data: ClassProperties<T> | K,
    configs?: ClassTransformOptions
  ) {
    return plainToInstance(cl, data, { ...this.toInstanceConfigs, ...configs });
  }
}
