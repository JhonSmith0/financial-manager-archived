import JWT from "@/common/JWT/JWT";
import { JsonWebTokenError } from "jsonwebtoken";

describe("JWT", () => {
  const jwt = new JWT("1");

  const payload = { id: "123" };
  const expiredToken = jwt.encode(payload, { expiresIn: 0, algorithm: "none" });
  const activeToken = jwt.encode(payload, {
    expiresIn: "1d",
    algorithm: "none",
  });

  it("should not pass", () => {
    expect(() => jwt.verify(expiredToken)).toThrowError(JsonWebTokenError);
  });
  it("should pass", () => {
    expect(() => jwt.verify(activeToken)).toThrowError(JsonWebTokenError);
  });

  it("should decode", () => {
    expect(jwt.decode(activeToken) as any).toMatchObject(payload);
  });
});
