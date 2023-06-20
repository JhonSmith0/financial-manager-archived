import {
    ClassConstructor,
    ClassTransformOptions,
    plainToInstance,
} from "class-transformer"

export class Transformer {
    public static toInstanceConfigs: ClassTransformOptions = {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
    }

    public static plainToInstance<K, T>(
        cl: ClassConstructor<T>,
        data: ClassProperties<T> | K,
        configs?: ClassTransformOptions
    ) {
        return plainToInstance(cl, data, {
            ...this.toInstanceConfigs,
            ...configs,
        })
    }

    public static assignPlainToInstance(
        constructor: ClassConstructor<any>,
        data: any,
        obj: any
    ) {
        Object.assign(obj, this.plainToInstance(constructor, data))
    }
}
