export abstract class UseCase<T = any, K = any> {
    public abstract execute(data: T): K
}
