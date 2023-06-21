import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common"
import { Response } from "express"
import adaptErrors from "../adapters/adaptErrors"

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const adapted =
            exception instanceof HttpException
                ? exception
                : adaptErrors(exception)

        const res: Response = host.switchToHttp().getResponse()
        res.status(adapted.getStatus()).json(adapted.getResponse())
    }
}
