import { loadEnv } from "@financial/core/dist/utils/loadEnv"
import { ValidationPipe } from "@nestjs/common"
import { createApp } from "."
import { AllExceptionFilter } from "./filters/AllException"
import { AdaptLeftRightInterceptor } from "./interceptors/AdaptLeftRight"
import { configureApp } from "configureApp"

async function main() {
    // Loads envs from core package
    loadEnv(process.env.NODE_ENV || "dev")
    const app = await createApp()
    configureApp(app)

    app.listen(3000)
}

main()
