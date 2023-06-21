import { INestApplication, ValidationPipe } from "@nestjs/common"
import { AllExceptionFilter } from "@/filters/AllException"
import { AdaptLeftRightInterceptor } from "@/interceptors/AdaptLeftRight"

export function configureApp(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                exposeDefaultValues: true,
                excludeExtraneousValues: true,
            },
        })
    )

    app.useGlobalInterceptors(new AdaptLeftRightInterceptor())
    app.useGlobalFilters(new AllExceptionFilter())

    app.enableCors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
    return app
}
