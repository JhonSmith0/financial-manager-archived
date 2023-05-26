export default abstract class Controller<T, K = any> {
  public abstract handle(data: T): Promise<K>;
}
