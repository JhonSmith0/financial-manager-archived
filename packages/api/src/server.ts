import { loadEnv } from "@financial/core/dist/utils/loadEnv"
import { ValidationPipe } from "@nestjs/common"
import { createApp } from ".."

async function main() {
    // Loads envs from core package
    loadEnv(process.env.NODE_ENV || "dev")
    const app = await createApp()

    app.useGlobalPipes(
        new ValidationPipe({
            transformOptions: {
                exposeDefaultValues: true,
                excludeExtraneousValues: true,
            },
        })
    )

    app.enableCors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })

    app.listen(3000)
}

main()
