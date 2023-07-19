import { ValidationPipe } from "@nestjs/common"
import { createApp } from "."
import { AllExceptionFilter } from "./filters/AllException"
import { AdaptLeftRightInterceptor } from "./interceptors/AdaptLeftRight"

async function main() {
    // Loads envs from core package
    const app = await createApp()
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

    app.listen(3000)
}

main()
