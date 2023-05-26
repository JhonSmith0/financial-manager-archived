import Account from "../entity";
import AccountProps from "../types/AccountProps";
import AccountRepository from "../types/AccountRepository";

export default class AccountRepositoryInMemory implements AccountRepository {
  private data: Account[] = [];

  public async exists(acc: AccountProps): Promise<boolean> {
    return !!this.data.find((e) => {
      return (
        e.id === acc.id || (e.name === acc.name && e.userId === acc.userId)
      );
    });
  }

  public async add(acc: Account): Promise<void> {
    this.data.push(acc);
  }
  public async remove(id: string): Promise<void> {
    this.data.splice(
      this.data.findIndex((e) => e.id === id),
      1
    );
  }
  public async update(
    id: string,
    data: Omit<Partial<AccountProps>, "id">
  ): Promise<void> {
    const i = this.data.findIndex((e) => e.id === id);
    this.data[i] = Account.linkProto({ ...this.data[i], ...data });
  }
  findByProp<T extends keyof AccountProps>(
    prop: T,
    value: AccountProps[T],
    unique: false
  ): Promise<AccountProps[]>;
  findByProp<T extends keyof AccountProps>(
    prop: T,
    value: AccountProps[T],
    unique: true
  ): Promise<void | AccountProps>;

  public async findByProp(
    prop: unknown,
    value: unknown,
    unique: unknown
  ): Promise<AccountProps | AccountProps[] | void> {
    //@ts-ignore
    if (unique) return this.data.find((e) => e[prop] === value);
    //@ts-ignore
    return this.data.filter((e) => e[prop] === value);
  }
}