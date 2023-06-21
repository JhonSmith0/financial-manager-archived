import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from "class-validator"

export function IsNotEqualToProperty<T>(
    property: keyof T,
    validationOptions?: ValidationOptions
) {
    return function (object: T, propertyName: string) {
        registerDecorator({
            name: "IsEqualToProperty",
            target: (object as any).constructor,
            propertyName: propertyName,
            constraints: [property],
            options: {
                message: `${propertyName} cannot be equal to ${String(
                    property
                )}`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const prop = (args.object as any)[property]
                    return value !== prop
                },
            },
        })
    }
}
