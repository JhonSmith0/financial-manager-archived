import User from "../entity/User";
import UserProps from "../types/UserProps";
import UserRepository from "../types/UserRepository";

export default class UserRepositoryInMemory implements UserRepository {
  public data: User[] = [];

  public async add(user: User): Promise<void> {
    this.data.push(user);
  }

  public async remove(id: string): Promise<void> {
    this.data.splice(
      this.data.findIndex((e) => e.id === id),
      1
    );
  }

  public async update(id: string, data: Partial<UserProps>): Promise<void> {
    const i = this.data.findIndex((e) => e.id === id);
    this.data[i] = await User.create({ ...this.data[i], ...data });
  }

  findByProp<T extends keyof UserProps>(
    prop: T,
    value: UserProps[T],
    unique: false
  ): Promise<UserProps[]>;
  findByProp<T extends keyof UserProps>(
    prop: T,
    value: UserProps[T],
    unique: true
  ): Promise<void | UserProps>;
  public async findByProp<T extends keyof UserProps>(
    prop: T,
    value: UserProps[T],
    unique: boolean
  ): Promise<void | UserProps | UserProps[]> {
    if (unique) return this.data.find((e) => e[prop] === value);
    return this.data.filter((e) => e[prop] === value);
  }
}
