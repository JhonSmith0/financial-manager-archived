export default abstract class Pipe<
    T,
    K = void,
    N extends Pipe<K, any> = Pipe<K, any, any>
> {
    public abstract handle(data: T): Promise<any> | any

    protected next: N

    protected async forward(data: K) {
        if (!this.next) return data
        return await this.next.handle(data)
    }

    public setNext<T extends N>(next: T): T {
        this.next = next
        return next
    }
}
