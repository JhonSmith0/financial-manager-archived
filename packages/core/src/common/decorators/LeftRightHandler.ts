import { isAsyncFunction } from "util/types";

export function LeftRightHandler(isAsync = true) {
  return <T>(target: T, property: keyof T, desc: PropertyDescriptor) => {
    const fn = desc.value;

    if (isAsync) {
      desc.value = async function (...args: Parameters<typeof fn>) {
        const result = await fn.apply(this, args);
        if (!result) return result;
        if (result._tag === "Left") throw result.left;
        if (result._tag === "Right") return result.right;
        return result;
      };
    } else {
      desc.value = function (...args: Parameters<typeof fn>) {
        const result = fn.apply(this, args);
        if (!result) return result;
        if (result._tag === "Left") throw result.left;
        if (result._tag === "Right") return result.right;
        return result;
      };
    }
  };
}
