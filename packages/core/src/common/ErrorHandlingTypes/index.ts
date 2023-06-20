abstract class ErrorHandling<T> {
    public abstract readonly tag: "left" | "right"
    public abstract value: T
    public isLeft(): this is Left<T> {
        return this.tag === "left"
    }
    public isRight(): this is Right<T> {
        return this.tag === "right"
    }
}

export class Left<T> extends ErrorHandling<T> {
    public readonly tag = "left"
    constructor(public value: T) {
        super()
    }
}

export class Right<T> extends ErrorHandling<T> {
    public readonly tag = "right"
    constructor(public value: T) {
        super()
    }
}

export function left<T>(val: T) {
    return new Left(val)
}

export function right<T>(val: T) {
    return new Right(val)
}

export type Either<L, R> = Left<L> | Right<R>
