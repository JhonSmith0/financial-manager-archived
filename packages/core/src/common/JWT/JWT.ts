import jwt from "jsonwebtoken";

type EncodeOptions = OptionalProps<
  Parameters<typeof jwt["sign"]>[2],
  "algorithm"
>;
type DecodeOptions = Parameters<typeof jwt["decode"]>[1];
type VerifyOptions = Parameters<typeof jwt["verify"]>[2];

export default class JWT {
  constructor(private secret: string) {}

  public encode(payload: any, options?: EncodeOptions) {
    return jwt.sign(payload, this.secret, options);
  }
  public decode(hash: string, options?: DecodeOptions) {
    return jwt.decode(hash, options);
  }
  public verify(hash: string, options?: VerifyOptions) {
    return jwt.verify(hash, this.secret, options);
  }
}
