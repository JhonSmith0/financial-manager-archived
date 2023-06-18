import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Param decorator who gets the user attached to the request object
 * @returns
 */
export const UserEntity = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	}
);
