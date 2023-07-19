import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common"
import { map } from "rxjs"

@Injectable()
export class AdaptLeftRightInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, caller: CallHandler) {
        return caller.handle().pipe(
            map((value) => {
                if (!value) return value
                if (value.isLeft?.()) throw value.value
                if (value.isRight?.()) return value.value
            })
        )
    }
}
