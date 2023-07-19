import { Either } from "../ErrorHandlingTypes"

export function LeftRightHandler(isAsync = true) {
    return <T>(target: T, property: keyof T, desc: PropertyDescriptor) => {
        const fn = desc.value

        if (isAsync) {
            desc.value = async function (...args: Parameters<typeof fn>) {
                const result = (await fn.apply(this, args)) as Either<any, any>
                if (!result) return result
                if (result.isLeft?.()) throw result.value
                if (result.isRight?.()) return result.value
                return result
            }
        } else {
            desc.value = function (...args: Parameters<typeof fn>) {
                const result = fn.apply(this, args) as Either<any, any>
                if (!result) return result
                if (result.isLeft?.()) throw result.value
                if (result.isRight?.()) return result.value
                return result
            }
        }
    }
}
