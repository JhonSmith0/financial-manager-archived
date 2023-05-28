import { Transformer } from "@/common/Transformer";
import { Expose } from "class-transformer";

class Test {
  @Expose()
  name: string;
}

describe("Transformer", () => {
  const data = {
    name: "hello!",
    extraProp: "I'm not supposed to be here!",
  };

  const instance = Transformer.plainToInstance(Test, data);

  it("should have removed the extraProp", () => {
    //@ts-ignore
    expect(instance.extraProp).toBeFalsy();
  });
});
