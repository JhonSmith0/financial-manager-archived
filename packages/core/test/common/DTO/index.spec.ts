import DTO from "@/common/DTO/DTO";
import { Expose } from "class-transformer";

class Test extends DTO<Test> {
  @Expose()
  public prop: string;
}

describe("DTO tests", () => {
  const obj = new Test({
    prop: "123456",
    prop2: "123456",
  } as any);

  it("should pass", () => {
    expect(obj).toHaveProperty("prop");
    expect(obj).not.toHaveProperty("prop2");
  });
});
