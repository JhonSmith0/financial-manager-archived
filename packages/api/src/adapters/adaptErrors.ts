import ExpectedError from "@financial/core/dist/common/errors/ExpectedError";

import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common/exceptions";

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

	console.log({ error });

	return new InternalServerErrorException("Something went wrong!");
}

export function AdaptErrors(isAsync = true) {
	return <T>(obj: T, key: string, desc: PropertyDescriptor) => {
		if (typeof desc.value !== "function")
			throw new Error("Wrong usage of decorator!");

		const fn = desc.value as () => any;
		if (isAsync) {
			desc.value = async function (...args: Parameters<typeof fn>) {
				try {
					return await fn.apply(this, args);
				} catch (error) {
					throw adaptErrors(error);
				}
			};
		} else {
			desc.value = function (...args: Parameters<typeof fn>) {
				try {
					return fn.apply(this, args);
				} catch (error) {
					throw adaptErrors(error);
				}
			};
		}
	};
}
