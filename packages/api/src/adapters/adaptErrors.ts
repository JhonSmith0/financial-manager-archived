import ExpectedError from "@financial/core/dist/common/errors/ExpectedError";

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common/exceptions";
import { isAsyncFunction } from "util/types";

const strategy = {
  400: BadRequestException,
  409: ConflictException,
  404: NotFoundException,
  403: ForbiddenException,
};

new BadRequestException();

export default function adaptErrors(error: ExpectedError) {
  if (error.code in strategy)
    return new strategy[error.code]({ ...error, message: error.message });
  return new InternalServerErrorException("Something went wrong!");
}

export function adaptErrorsDecorator<T = any>() {
  return (obj: T, key: string, desc: PropertyDescriptor) => {
    if (typeof desc.value !== "function")
      throw new Error("Wrong usage of decorator!");

    const async = isAsyncFunction(desc.value);
    const fn = desc.value as () => any;
    if (async) {
      desc.value = async function (...args: Parameters<typeof fn>) {
        try {
          return await fn.apply(this, args);
        } catch (error) {
          throw adaptErrors(error);
        }
      };
    }
  };
}
