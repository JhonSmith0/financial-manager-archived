import { compare, hash } from "bcrypt";
export default class Hash {
  public static async hash(string: string, salt: number) {
    return await hash(string, salt);
  }

  public static async compareTo(hash: string, candidate: string) {
    return await compare(candidate, hash);
  }
}
