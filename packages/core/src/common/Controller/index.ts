export default abstract class Controller<T, K> {
  public abstract handle(data: T): Promise<K>;
}
