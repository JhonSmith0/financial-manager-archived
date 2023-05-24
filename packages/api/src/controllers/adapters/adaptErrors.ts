import ExpectedError from '@financial/core/dist/common/errors/ExpectedError';
import ValidationError from '@financial/core/dist/common/errors/ValidationError';

import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';

const strategy = {
  400: BadRequestException,
  409: ConflictException,
  404: NotFoundException,
};

new BadRequestException();

export default function adaptErrors(
  error: ExpectedError | (ValidationError & { code?: number }),
) {
  if (error.code in strategy) return new strategy[error.code](error);
  return new InternalServerErrorException(error);
}
